const { default: mongoose } = require("mongoose");


const RoleSchema = new mongoose.Schema ({
    title: {type: String , unique: true},
    permissions: {type: [mongoose.Types.ObjectId] , ref: "permissions" , default: []}
} , {
    toJSON: {
        virtuals: true
    }
});



const RoleModel = mongoose.model("role" , RoleSchema);

module.exports = RoleModel;
