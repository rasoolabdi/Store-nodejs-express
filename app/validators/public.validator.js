const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../utils/constant");
const createHttpError = require("http-errors");


const ObjectIdValidator = Joi.object({
    id: Joi.string().regex(MongoIDPattern).error(new Error(createHttpError.BadRequest("شناسه محصول وارد شده صحیح نمی باشد ."))),

});


module.exports = {
    ObjectIdValidator
}