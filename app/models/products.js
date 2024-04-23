const {default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");


const ProductSchema = new mongoose.Schema({
    title: {type: String , required: true},
    short_text: {type: String, required: true},
    text: {type: String , required: true},
    images: {type: [String], required: true},
    tags: {type: [String] , default: []},
    category: {type: mongoose.Types.ObjectId ,ref: "category" ,required: true},
    comments: {type: [CommentSchema] , default: []},
    likes: {type: [mongoose.Types.ObjectId]  , default: []},
    deslikes: {type: [mongoose.Types.ObjectId] , default: []},
    bookmarks: {type: [mongoose.Types.ObjectId]  , default: []},
    price: {type: Number , default: 0},
    discount: {type: Number, default: 0},
    count: {type: Number},
    type: {type: String , required: true},  //virtual or phtsical
    format: {type: String},
    supplier: {type: mongoose.Types.ObjectId , required: true},
    feature: {type: Object , default: {
        length: "",
        height: "",
        width: "",
        weight: "",
        colors: [],
        model: [],
        madein: "",
    }},
});

const ProductModel = mongoose.model("product" , ProductSchema);
module.exports = ProductModel;
