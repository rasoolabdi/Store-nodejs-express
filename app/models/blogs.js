const {default: mongoose } = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId , ref: "user" , required: true},
    comment: {type: String , required: true},
    createdAt: {type: Date , default: new Date().getTime()},
    parent: {type: mongoose.Types.ObjectId}
})


const BlogSchema = new mongoose.Schema({
    author : {type: mongoose.Types.ObjectId ,ref: "user", required: true},
    title: {type: String , required: true},
    short_text: {type: String , required: true},
    text: {type: String , required: true},
    image : {type: String , required: true},
    tags: {type: [String] , default: []},
    category: {type: [mongoose.Types.ObjectId] ,ref: "category" , required: true},
    comments: {type: [CommentSchema] , default: []},
    likes: {type: [mongoose.Types.ObjectId] , ref: "users" , default: []},
    deslikes : {type: [mongoose.Types.ObjectId] , ref: "users" , default: []},
    bookmarks: {type: [mongoose.Types.ObjectId] , ref: "users" , default: []},
},{
    timestamps: true , 
    versionKey: false,
    toJSON : {
        virtuals: true
    }
});

BlogSchema.virtual("user" , {
    ref: "user",
    localField: "_id",
    foreignField: "author"
});


BlogSchema.virtual("category_detail" , {
    ref: "category",
    localField: "_id",
    foreignField: "category"
});

const BlogModel = mongoose.model("blog" , BlogSchema);
module.exports = BlogModel;
