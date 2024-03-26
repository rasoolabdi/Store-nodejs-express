const Joi = require("@hapi/joi");
const authSchema = Joi.object({
       mobile : Joi.string().length(11).required().error(new Error("شماره موبایل وارد شده صحیح نمی باشد"))
});

module.exports = {
    authSchema
}

// pattern(/^09[0-9]{9}$/)