const {default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title: {type: String , required: true},
    parent: {type: mongoose.Types.ObjectId , default: undefined}
},{
    id: false,
    versionKey: false,
    toJSON: {
        virtuals: true
    }
});


CategorySchema.virtual("children" , {
    ref: "category",
    localField: "_id",
    foreignField: "parent"
});

function autoPopulate(next) {
    this.populate([{path: "children" , select: {__v: 0} }]);
    next();
};

//method1: clean Code
CategorySchema.pre("find" , autoPopulate).pre("findOne" , autoPopulate);



//method2:

// CategorySchema.pre("findOne" , function(next) {
//     this.populate([{path: "children" , select: {__v: 0} }]);
//     next();
// });

// CategorySchema.pre("find" , function(next) {
//     this.populate([{path: "children" , select: {__v: 0} }]);
//     next();
// });


const CategoryModel = mongoose.model("category" , CategorySchema);
module.exports = CategoryModel;
