const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is require"],
    },
    email:{
        type:String,
        required:[true,"email is require"],
    },
    password:{
        type:String,
        required:[true,"password is require"],
    },
    date: {
        type: Date,
        required: true,
    },
    count: {
        type: Number,
        required: true,
        default: 0,
    },
})
const userModel = mongoose.model("users",userSchema);
module.exports=userModel;