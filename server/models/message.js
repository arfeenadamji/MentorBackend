const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const messageSchema  =new mongoose.Schema({
    message:{
        type:String,
        require:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
      mentorId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"user"
      }
    
},
{ timestamps: true }
)
module.exports = mongoose.model('message', messageSchema)