const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        ref: "User"
    },
    phoneId: {
        type: ObjectId,
        ref: "Phone"
    },
}, { timestamps: { createdAt: 'created_at' } });

const messageModel = mongoose.model('Message', messageSchema);

messageModel.findOne({text: 'Message 1'}).then((doc=>{
    if(!doc){
        return messageModel.create({
            text: 'Message 1',
        })
    }
    return 'already created'
})).then( msg =>{
    console.log('Initial dummy message : ',msg)
})

module.exports = mongoose.model('Message', messageSchema);
