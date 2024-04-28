const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../utils/constant");
const createHttpError = require("http-errors");
const addCategorySchema = Joi.object({
    title: Joi.string().min(3).max(50).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمی باشد .")),
    parent: Joi.string().allow("").regex(MongoIDPattern).allow("").error(createHttpError.BadRequest("شناسه والد ارسال شده صحیح نمی باشد  ."))
});

const updateCategorySchema = Joi.object({
    title: Joi.string().min(3).max(50).error(new Error("عنوان دسته بندی جهت آپدیت صحیح نمی باشد .")),
    parent: Joi.string().allow("").regex(MongoIDPattern).allow("").error(createHttpError.BadRequest("شناسه والد ارسال شده صحیح نمی باشد  ."))
})

module.exports = {
    addCategorySchema,
    updateCategorySchema
}
