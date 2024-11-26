const { userModel, themeModel, phoneModel } = require('../models');

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



function createPhone(req, res, next) {
    const { _id: userId } = req.user;
    const phoneData = req.body;
    const form = formidable()
    
    form.parse(req, (err,fields,files)=>{
        if (err){
            next(err);
            return;
        }
        console.log("Formidable fields, files", {fields, files});
        
    })

    return phoneModel.create({ ...phoneData, owner: userId })
        .then(phone => {
            res.status(200).json(phone)
        })
        .catch(next)
}

function editPhone(req, res, next) {
    const { phoneId } = req.params;
    const phoneData = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the phone, the phone will not be updated
    phoneModel.findOneAndUpdate({ _id: phoneId, userId }, { ...phoneData }, { new: true })
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

function deletePhone(req, res, next) {
    const { phoneId, themeId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        phoneModel.findOneAndDelete({ _id: phoneId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { phones: phoneId } }),
        messageModel.deleteMany({ phoneId: phoneId }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { phoneId } = req.params;
    const { _id: userId } = req.user;

    console.log('like')

    phoneModel.updateOne({ _id: phoneId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

module.exports = {
    getLatestPhones,
    getPhone,
    getPhones,
    createPhone,
    editPhone,
    deletePhone,
    like,
}
