const {default: mongoose, Schema } = require("mongoose");

const OTPSchema = new Schema({
    code: {type: String , required: false , default : undefined},
    expiresIn: {type: Number , required: false , default: 0}
})

const UserSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String , required: true , lowercase: true},
    email: {type: String , required: true , lowercase: true},
    mobile: {type: String},
    password: {type: String},
    otp : {
        type: OTPSchema
    }, 
    bills: {type: [] , default: []},
    discount: {type: Number , default: 0},
    birthday: {type: String},
    roles: {type: [String] , default: ["USER"]},

});

const UserModel = mongoose.model("user" , UserSchema);
module.exports = UserModel;
