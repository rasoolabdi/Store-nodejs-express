const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../utils/constant");


const createBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمی باشد .")),
    text: Joi.string().error(new Error("متن ارسال شده صحیح نمی باشد .")),
    short_text: Joi.string().error(new Error("متن کوتاه ارسال شده صحیح نمی باشد .")),
    image:Joi.string().error(new Error("تصویر ارسالی صحیح نمی باشد .")),
    tags: Joi.array().min(0).max(20).error(new Error("برچسب ها بیشتر از 20 آیتم نمیتوانند باشند")),
    category: Joi.string().pattern(MongoIDPattern).error(new Error("دستخ بندی مورد نظر یافت نشد"))
});

const updateCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمی باشد ."))
})

module.exports = {
    createBlogSchema,
    updateCategorySchema
}