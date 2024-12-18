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


module.exports = messageModel;
