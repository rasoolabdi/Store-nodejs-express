const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");

const addRoleSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان نقش یا رول صحیح نمی باشد .")),
    permissions: Joi.allow()
});


module.exports = {
    addRoleSchema,

}