const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const phoneSchema = new Schema({
    model: {
        type: String,
        required:true,
        minLength: 5
    },
    screenSize: {
        type: String,
        required:true,
        minLength: 1
    },
    description: {
        type: String,
        required: true,
    },
    
    price: {
        type: Number,
        required:true,
        validate: {
            validator : function(value){
                return value > 0;
            },
            message: 'Must be positive num'
        }
    },
    image: {
        type: String,
        required:true,
        validate : /https?:\/\// 
    },
    orderList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    msgList: [{
        type: Types.ObjectId,
        ref: 'Message'
    }]
},{ timestamps: { createdAt: 'created_at' } });

phoneSchema.methods = {
    testMethod: function(){
        console.log('phoneSchema test method');
        
    }
}

const phoneModel = mongoose.model('Phone', phoneSchema);


module.exports =  phoneModel;