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
});

phoneSchema.methods = {
    testMethod: function(){
        console.log('phoneSchema test method');
        
    }
}

const phoneModel = mongoose.model('Phone', phoneSchema);
phoneModel.findOne({model: 'Mopd1'}).then((doc=>{
    if(!doc){
        return phoneModel.create({
            model: 'Mopd1',
            screenSize: '10inch',
            description: 'Alab',
            price: 100,
            image: 'https://sdsdshshhg.com'
        })
    }
    return 'already created'
})).then( phone =>{
    console.log('Initial dummy phone : ',phone)
})

module.exports =  phoneModel;