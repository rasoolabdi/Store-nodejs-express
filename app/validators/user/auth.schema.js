const Joi = require("@hapi/joi");
const authSchema = Joi.object({
//     email: Joi.string().lowercase().trim().email().required().error(new Error("ایمیل وارد شده صحیح نمی باشد")),
//     password: Joi.string().min(6).max(16).trim().required().error(new Error("پسورد وارد شده باید بین شش الی شانزده کارکتر باشد"))
       mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).required().error(new Error("شماره موبایل وارد شده صحیح نم باشد"))
});

module.exports = {
    authSchema
}

// ^[789]\d{9,9}$