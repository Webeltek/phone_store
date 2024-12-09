const { userModel, messageModel, phoneModel } = require('../models');
const { formidable } = require('formidable');
const  fs  = require('node:fs')
const path = require('path');

function getLatestPhones(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    phoneModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .then(phones => {
            res.status(200).json(phones)
        })
        .catch(next);
}

function getPhone(req,res, next){
    const phoneId = req.params.phoneId
    phoneModel.findById(phoneId)
    .populate({
        path: 'msgList',
        populate: {
            path: 'authorId'
        }
    })
    .populate({ path: 'owner'})
    .then(phone => {
        res.status(200).json(phone)
    })
    .catch(next);
}

function getPhones(req,res, next){
    phoneModel.find().then(phones => {
        res.status(200).json(phones)
    })
    .catch(next);
}

function getOwnedPhones(req,res, next){
    const { _id: userId } = req.user;
    phoneModel.find({ owner: userId}).then(phones => {
        res.status(200).json(phones)
    })
    .catch(next);
}

function getOrderedPhones(req,res, next){
    const { _id: userId } = req.user;
    phoneModel.find({ orderList: { $in: [userId]}}).then(phones => {
        res.status(200).json(phones)
    })
    .catch(next);
}

function createPhone(req, res, next) {
    const { _id: userId } = req.user;
    //unused using formidable form.parse instead
    const phoneData = req.body;
    const uploadDir = path.join(__dirname, '../uploads');

    if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    }

    const form = formidable({
        uploadDir,
        keepExtensions: true
    })
    
    form.parse(req, (err,fields,files)=>{
        if (err){
            next(err);
            return;
        }
        const [ model] = fields.model;
        const [screenSize] = fields.screenSize;
        const [ price] = fields.price;
        const [ image] = fields.image;
        const [description] = fields.description;


        if(files.imageFile){
            const [persistentFile] = files.imageFile;
            const webPath = `${persistentFile.originalFilename}`;
            const newPath = path.join(form.uploadDir, persistentFile.originalFilename);
            
            fs.rename(persistentFile.filepath, newPath,()=>{
                //console.log("Formidable fields, files", {fields, files});
                return phoneModel.create({ model, screenSize, description, price: Number(price),image,imageFile: webPath , owner: userId })
                    .then(phone => {
                        res.status(200).json(phone)
                    })
                    .catch(next)
            })
        } else {
            return phoneModel.create({ model, screenSize, description, price: Number(price),image, owner: userId })
                    .then(phone => {
                        res.status(200).json(phone)
                    })
                    .catch(next)
        }
        

    })

}

function editPhone(req, res, next) {
    const { phoneId } = req.params;
    const phoneData = req.body;
    const { _id: userId } = req.user;

    const uploadDir = path.join(__dirname, '../uploads');
    
    const form = formidable({
        uploadDir,
        keepExtensions: true
    })

    form.parse(req, (err,fields,files)=>{
        if (err){
            next(err);
            return;
        }
        const [ model] = fields.model;
        const [screenSize] = fields.screenSize;
        const [ price] = fields.price;
        const [ image] = fields.image;
        const [description] = fields.description;

        if(files.imageFile){
            const [persistentFile] = files.imageFile;
            const webPath = `${persistentFile.originalFilename}`;
            const newPath = path.join(form.uploadDir, persistentFile.originalFilename);
            
            fs.rename(persistentFile.filepath, newPath,(err)=>{
                if(err){
                    console.log({editPhoneCopyFileErr: err})
                }
                // if the userId is not the same as this one of the phone, the phone will not be updated
                phoneModel.findOneAndUpdate(
                    { _id: phoneId, owner: userId }, 
                    { model, screenSize, description, price: Number(price),image,imageFile: webPath , owner: userId }, 
                    { new: true })
                    .then(updatedPhone => {
                        if (updatedPhone) {
                            res.status(200).json(updatedPhone);
                        }
                        else {
                            res.status(401).json({ message: `Not allowed!` });
                        }
                    })
                    .catch(next);
            })
        } else {
            // if the userId is not the same as this one of the phone, the phone will not be updated
            phoneModel.findOneAndUpdate(
                { _id: phoneId, owner: userId }, 
                { model, screenSize, description, price: Number(price),image ,imageFile: '', owner: userId }, 
                { new: true })
                .then(updatedPhone => {
                    if (updatedPhone) {
                        res.status(200).json(updatedPhone);
                    }
                    else {
                        res.status(401).json({ message: `Not allowed!` });
                    }
                })
                .catch(next);
        }
        
    })

}

function deletePhone(req, res, next) {
    const { phoneId } = req.params;
    const { _id: userId } = req.user;

    const uploadDir = path.join(__dirname, '../uploads');

    Promise.all([
        phoneModel.findOneAndDelete({ _id: phoneId, owner: userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { phones: phoneId } }),
        messageModel.deleteMany({ phoneId: phoneId }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                const imageFilePath = uploadDir + '/'+ deletedOne.imageFile;
                console.log({imageFilePath: imageFilePath})
                if (fs.existsSync(imageFilePath) && deletedOne.imageFile) {
                    fs.unlink(imageFilePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        return;
                    }
                    console.log('Phone and image file deleted successfully!');
                    });
                } else {
                    console.log('Phone without image file deleted successfuly!');
                }

                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function order(req, res, next) {
    const { phoneId } = req.params;
    const { _id: userId } = req.user;

    console.log('order')

    phoneModel.updateOne({ _id: phoneId }, { $addToSet: { orderList: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Order successful!' }))
        .catch(next)
}

module.exports = {
    getLatestPhones,
    getPhone,
    getPhones,
    getOwnedPhones,
    getOrderedPhones,
    createPhone,
    editPhone,
    deletePhone,
    order,
}
