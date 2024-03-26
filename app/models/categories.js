const {default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title: {type: String , required: true}
});

const CategoryModel = mongoose.model("category" , CategorySchema);
module.exports = CategoryModel;
