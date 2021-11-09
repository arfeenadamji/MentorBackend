const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema  =new mongoose.Schema({
    firstName:{
        type:String,
        unique:true,
        require:true
    },
    lastName:{
        type:String,
        unique:true,
        require:true
    },
    contact:{
        type:Number,
        // unique:true,
        reuire:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        // unique:true,
        required:true
    },
    DOB:{
        type:String,
        // unique:true,
        required:true
    },
    degree:{
        type:String,
        // unique:true,
        required:true
    },
    skills:{
        type:String,
        // unique:true,
        required:true
    },
    gender:{
        type:String,
        // unique:true,
        required:true
    },
    userType:{
        type:String,
        required:true
    }

},
{ timestamps: true }
)
module.exports = mongoose.model('user', userSchema)