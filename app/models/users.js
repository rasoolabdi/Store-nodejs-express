const {default: mongoose, Schema } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productID: {type: mongoose.Types.ObjectId , ref: "product"},
    count: {type: Number , default: 1}
});

const CourseSchema = new mongoose.Schema({
    courseID: {type: mongoose.Types.ObjectId , ref: "course"},
    count: {type: Number , default: 1}
})

const BasketSchema = new mongoose.Schema({
    products: {type: [ProductSchema] , default: []},
    courses: {type: [CourseSchema] , default: []}
});


const OTPSchema = new Schema({
    code: {type: String , required: false , default : undefined},
    expiresIn: {type: Number , required: false , default: 0}
})

const UserSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String , required: false , lowercase: true},
    email: {type: String , required: false , lowercase: true},
    mobile: {type: String},
    password: {type: String},
    otp : {
        type: OTPSchema
    }, 
    bills: {type: [] , default: []},
    discount: {type: Number , default: 0},
    birthday: {type: String},
    token: {type: String , default: ""},
    role: {type: String , default: "USER"},
    Courses: {type: [mongoose.Types.ObjectId] , ref: "course" , default: []},
    Products: {type: [mongoose.Types.ObjectId] , ref: "product" , default: []},
    basket: {type: BasketSchema}
},{
    timestamps:true,
    toJSON: {
        virtuals: true
    }
});

UserSchema.index({first_name:"text" , last_name: "text" , mobile: "text" , username: "text" , email: "text"});
const UserModel = mongoose.model("user" , UserSchema);
module.exports = UserModel;
