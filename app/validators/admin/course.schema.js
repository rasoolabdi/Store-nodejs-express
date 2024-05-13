const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../utils/constant");


const createCourseSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دوره صحیح نمی باشد .")),
    short_text: Joi.string().error(createHttpError.BadRequest("متن کوتاه ارسالی صحیح نمی باشد")),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسالی صحیح نمی باشد .")),
    tags: Joi.array().min(0).max(30).error(createHttpError.BadRequest("برچسب ها بیشتر از سی کاراکتر نمیتوانند باشند .")),
    category: Joi.string().regex(MongoIDPattern).error(createHttpError.BadRequest("دسته بندی مورد نظر یافت نشد .")),
    price: Joi.number().error(createHttpError.BadRequest("قیمت وارد شده صحیح نمی باشد .")),
    discount: Joi.number().min(0).max(20).error(createHttpError.BadRequest("تخفیف وارد شده صحیح نمی باشد .")),
    type: Joi.string().max(20).regex(/(free|cash|special)/i),
    status: Joi.string().regex(/(notStarted|Holding|Completed)/i),
    filename: Joi.string().regex(/(\.png|\.jpeg|\.jpg|\.png|\.webp)$/).error(createHttpError.BadRequest("فرمت تصویر ارسالی صحیح نمی باشد .")),
    fileUploadPath: Joi.allow()
});

const createEpisodeSchema = Joi.object({
    title: Joi.string().min(3).max(50).error(createHttpError.BadRequest("عنوان اپیزود صحیح نمی باشد .")),
    text: Joi.string().error(createHttpError.BadRequest("متن ارسالی برای اپیزود صحیح نمی باشد .")),
    type: Joi.string().regex(/(lock|unlock)/i),
    chapterId: Joi.string().regex(MongoIDPattern).error(createHttpError.BadRequest("شناسه فصل مورد نظر صحیح نمی باشد .")),
    courseId: Joi.string().regex(MongoIDPattern).error(createHttpError.BadRequest("شناسه دوره مورد نظر صحیح نمی باشد .")),
    filename: Joi.string().regex(/(\.mp4|\.mpg|\.mov|\.avi|\.mkv|\.mpeg)$/).error(createHttpError.BadRequest("فرمت فیلم ارسالی صحیح نمی باشد")),
    fileUploadPath: Joi.allow()
})

module.exports = {
    createCourseSchema,
    createEpisodeSchema
}