const { Schema, model } = require("mongoose");




const UserSchema = new Schema({
    first_name: {type: String , required: true},
    last_name: {type: String , required: true},
    username: {type: String , required: true , lowercase: true},
    email: {type: String , required: true , lowercase: true},
    mobile: {type: String , required: true},
    password: {type: String , required: false},
    otp : {typ: Object ,required: true,  default : {
        code: 0,
        expiresIn: 0
    }},
    bills: {type: [] , default: [] , required: false},
    discount: {type: Number , default: 0 , required: false},
    birthday: {type: String , required: false},
    roles: {type: [String] , default: ["USER"] , required: false},

});

const UserModel = model("user" , UserSchema);
module.exports = UserModel;
