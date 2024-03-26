const {default: mongoose } = require("mongoose");




const BlogSchema = new mongoose.Schema({
    author : {type: mongoose.Types.ObjectId , required: true},
    title: {type: String , required: true},
    text: {type: String , required: true},
    image : {type: String , required: true},
    tags: {type: [String] , default: []},
    category: {type: mongoose.Types.ObjectId , required: true},
    comments: {type: [] , default: []},
    like: {type: [mongoose.Types.ObjectId] , default: []},
    deslike : {type: [mongoose.Types.ObjectId] , default: []},
    bookmark: {type: [mongoose.Types.ObjectId] , default: []},
});

const BlogModel = mongoose.model("blog" , BlogSchema);
module.exports = BlogModel;
