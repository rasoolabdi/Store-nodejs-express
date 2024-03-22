const { Schema, model } = require("mongoose");

const SliderSchema = new Schema({
    title: {type: String , required: false},
    text: {type: String , required: false},
    image: {type: String , required: true},
    type: {type: String , default: "main"}
});

const SliderModel = model("slider" , SliderSchema);
module.exports = SliderModel;
