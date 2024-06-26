const {default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");
const { getTimeOfCourse } = require("../utils/function");


const Episodes = new mongoose.Schema({
    title: {type: String , required: true},
    text: {type: String , required: true},
    type: {type: String, default: "unlock"},
    time: {type: String , required: true},
    videoAddress: {type: String , required: true}
} , {
    toJSON: {
        virtuals: true
    }
})

Episodes.virtual("videoURL").get(function() {
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`
});

const Chapter = new mongoose.Schema({
    title: {type: String ,required: true },
    text: {type: String , default: ""},
    episodes: {type: [Episodes] , default: []}
})

const CourseSchema = new mongoose.Schema({
    title: {type: String , required: true},
    short_text: {type: String, required: true},
    text: {type: String , required: true},
    image: {type: String, required: true},
    tags: {type: [String] , default: []},
    category: {type: mongoose.Types.ObjectId ,ref: "category" ,required: true},
    comments: {type: [CommentSchema] , default: []},
    likes: {type: [mongoose.Types.ObjectId]  , default: []},
    dislikes: {type: [mongoose.Types.ObjectId] , default: []},
    bookmarks: {type: [mongoose.Types.ObjectId]  , default: []},
    price: {type: Number , default: 0},
    discount: {type: Number, default: 0},
    type: {type: String ,default: "free"/*free , cash , special */ ,required: true}, 
    status: {type: String , default: "notStarted"/*notStarted , Holding , Completed */},
    // time: {type: String, default: "00:00:00"},
    teacher: {type: mongoose.Types.ObjectId ,ref: "user" ,required: true},
    chapters: {type: [Chapter] ,default: []},
    students: {type: [mongoose.Types.ObjectId] , default: [] , ref: "user"},
    
}, {
    toJSON: {
        virtuals: true
    }
});

CourseSchema.index({title: "text", short_text: "text",text: "text"});
CourseSchema.virtual("imageURL").get(function() {
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
});

CommentSchema.virtual("totalTimeVideos").get(function() { // create totalTime videos
    return getTimeOfCourse(this.chapters || []);
})

const CourseModel = mongoose.model("course" , CourseSchema);
module.exports = CourseModel;
