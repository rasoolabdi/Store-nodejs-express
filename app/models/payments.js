const {default: mongoose } = require("mongoose");




const PaymentSchema = new mongoose.Schema({



});

const PaymentModel = mongoose.model("payment" , PaymentSchema);
module.exports = PaymentModel;
