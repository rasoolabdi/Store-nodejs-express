const { Schema, model, Types } = require("mongoose");


const ProductSchema = new Schema({
    title: {type: String , required: true},
    short_desc: {type: String, required: true},
    total_desc: {type: String , required: true},
    images: {type: [String], required: true},
    tags: {type: [String] , required: false , default: []},
    category: {type: Types.ObjectId , required: true},
    comments: {type: [] , required: false , default: []},
    like: {type: [Types.ObjectId] , required: false , default: []},
    deslike: {type: [Types.ObjectId] , required: false, default: []},
    bookmark: {type: [Types.ObjectId] , required: false , default: []},
    price: {type: Number , required: false , default: 0},
    discount: {type: Number , required: false , default: 0},
    count: {type: Number , required: false},
    type: {type: String , required: true},
    time : {type: String , required: false},
    format: {type: String , required: false},
    teacher: {type: Types.ObjectId , required: true},
    feture: {type: Object , default: {
        length: "",
        height: "",
        width: "",
        weight: "",
        colors: [],
        model: [],
        madein: "",
    }}
});

const ProductModel = model("product" , ProductSchema);
module.exports = ProductModel;
