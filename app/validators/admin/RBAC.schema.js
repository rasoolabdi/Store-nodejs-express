const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../utils/constant");

const addRoleSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان نقش یا رول صحیح نمی باشد .")),
    permissions: Joi.array().items(Joi.string().regex(MongoIDPattern)).error(createHttpError.BadRequest("دسترسی های ارسال شده صحیح نمی باشد ."))
});

const addPermissionSchema = Joi.object({
    name: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان برای سطح دسترسی صحیح نمی باشد .")),
    description: Joi.string().min(3).max(30).error(createHttpError.BadRequest("توضیحات سطح دسترسی صحیح نمی باشد ."))
});


module.exports = {
    addRoleSchema,
    addPermissionSchema
}