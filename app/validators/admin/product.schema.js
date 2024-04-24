const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../utils/constant");

const createProductSchema  = Joi.object({
    title: Joi.string().min(3).max(50).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمی باشد.")),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسالی صحیح نمی باشد .")),
    short_text: Joi.string().error(createHttpError.BadRequest("متن کوتاه ارسالی صحیح نمی باشد .")),
    tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest("برچسب ها بیشتر از بیست کاراکتر نمیتوانند باشند .")),
    colors: Joi.array().min(1).max(20).error(createHttpError.BadRequest("رنگ های انتخابی بیشتر از 20 آیتم نمیتواند باشد .")),
    category: Joi.string().regex(MongoIDPattern).error(createHttpError.BadRequest("دسته بندی مورد نظر صحیح نمی باشد .")),
    price: Joi.number().error(createHttpError.BadRequest("قیمت وارد شده صحیح نمی باشد .")),
    discount: Joi.number().error(createHttpError.BadRequest("تخفیف وارد شده صحیح نمی باشد.")),
    count: Joi.number().error(createHttpError.BadRequest("تعداد محصول وارد شده صحیح نمی باشد .")),
    weight: Joi.number().allow(null , 0 , "0").error(createHttpError.BadRequest("وزن محصول وارد شده صحیح نمی باشد")),
    length: Joi.number().allow(null , 0 , "0").error(createHttpError.BadRequest("طول محصول وارد شده صحیح نمی باشد .")),
    height: Joi.number().allow(null , 0 , "0").error(createHttpError.BadRequest("ارتفاع محصول وارد شده صحیح نمی باشد")),
    width: Joi.number().allow(null , 0 , "0").error(createHttpError.BadRequest("عرض محصول وارد شده صحیح نمی باشد .")),
    type: Joi.string().regex(/(virtual|physical)/i),
    filename: Joi.string().regex(/(\.png|\.jpg|\.jpeg|\.png|\.webp)$/).error(createHttpError.BadRequest("تصویر ارسالی صحیح نمی باشد .")),
    fileUploadPath: Joi.allow()
});


module.exports = {
    createProductSchema
}