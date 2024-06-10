const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const BlogModel = require("../../models/blogs");
const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { VerifyAccessTokenInGraphQL } = require("../../middlewares/verifyAccessToken");
const { copyObject } = require("../../utils/function");
const { default: mongoose } = require("mongoose");
const CourseModel = require("../../models/course");
const ProductModel = require("../../models/products");


const createCommentForBlog = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },
        blogId: { type: GraphQLString },
        parent: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInGraphQL(req);
        const { comment, blogId, parent } = args;
        if(!mongoose.isValidObjectId(blogId)) throw createHttpError.BadRequest("شناسه بلاگ ارسال شده صحیح نمی باشد .");
        await checkExistBlog(blogId);
        if(parent && mongoose.isValidObjectId(parent)) {
            const commentDocument = await getComment(BlogModel , parent);
            if(commentDocument && !commentDocument.openToComment) throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست .");
            const createAnswerResult = await BlogModel.updateOne({
                _id: blogId,
                "comments._id" : parent} , {
                $push: {
                    "comments.$.answers" : {
                        comment,
                        user: user._id,
                        show: false,
                        openToComment: false
                    }
                }
            });
            if(!createAnswerResult.modifiedCount) throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد")
            return {
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "پاسخ شما با موفقیت انجام شد ."
                }
            }
        }
        else {
            await BlogModel.updateOne({ _id: blogId }, {
                $push: {
                    comments: {
                        comment,
                        user: user._id,
                        show: false,
                        openToComment: true
                    }
                }
            });
        }

        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: "ثبت نظر با موفقیت انجام شد . نظر شما پس از تایید قابل نمایش خواهد بود ."
            }
        }
    }
}

const createCommentForCourse = {
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        courseId: {type: GraphQLString},
        parent: {type: GraphQLString}
    },
    resolve: async(_ , args , context) => {
        const {req} = context;
        const {comment , courseId , parent} = args;
        const user = await VerifyAccessTokenInGraphQL(req);
        if(!mongoose.isValidObjectId(courseId)) throw createHttpError.BadRequest("شناسه دوره نامعتبر می باشد .");
        await checkExistCourse(courseId);
        if(parent && mongoose.isValidObjectId(parent)) {
            const commentDocument = await getComment(CourseModel , parent);
            if(commentDocument && !commentDocument.openToComment) {
                throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست")
            }
            const createAnswerResult = await CourseModel.updateOne({
                _id: courseId,
                "comments._id" : parent} , {
                $push: {
                    "comments.$.answers" : {
                        comment,
                        user: user._id,
                        show: false,
                        openToComment: false
                    }
                }
            })
            if(!createAnswerResult.modifiedCount) throw createHttpError.InternalServerError("پاسخ ثبت نشد .");
            return {
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "پاسخ با موفقیت ثبت شد ."
                }
            }
        }
        else {
            await CourseModel.updateOne({_id: courseId} , {
                $push: {
                    comments: {
                        comment,
                        user: user._id,
                        show: false,
                        openToComment: true
                    }
                }
            })
        }

        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: "نظر شما با موفقیت ثبت شد . نظر شما پس از تایید قابل نمایش خواهد بود ."
            }
        }
    }
}

const createCommentForProduct = {
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        productId: {type: GraphQLString},
        parent: {type: GraphQLString}
    },
    resolve: async(_ , args , context) => {
        const {req} = context;
        const {comment , productId , parent} = args;
        const user = await VerifyAccessTokenInGraphQL(req);
        if(!mongoose.isValidObjectId(productId)) throw createHttpError.BadRequest("شناسه دوره نامعتبر می باشد .");
        await checkExistProduct(productId);
        if(parent && mongoose.isValidObjectId(parent)) {
            const commentDocument = await getComment(ProductModel , parent);
            if(commentDocument && !commentDocument.openToComment) {
                throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست")
            }
            const createAnswerResult = await ProductModel.updateOne({
                _id: productId,
                "comments._id" : parent} , {
                $push: {
                    "comments.$.answers" : {
                        comment,
                        user: user._id,
                        show: false,
                        openToComment: false
                    }
                }
            })
            if(!createAnswerResult.modifiedCount) throw createHttpError.InternalServerError("پاسخ ثبت نشد .");
            return {
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "پاسخ با موفقیت ثبت شد ."
                }
            }
        }
        else {
            await ProductModel.updateOne({_id: productId} , {
                $push: {
                    comments: {
                        comment,
                        user: user._id,
                        show: false,
                        openToComment: true
                    }
                }
            })
        }

        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: "نظر شما با موفقیت ثبت شد . نظر شما پس از تایید قابل نمایش خواهد بود ."
            }
        }
    }
}


async function checkExistProduct(id) {
    const product = await ProductModel.findById(id);
    if(!product) {
        throw createHttpError.NotFound("محصولی با این شناسه یافت نشد .");
    }
    return product;
}

async function checkExistCourse(id) {
    const course = await CourseModel.findById(id);
    if(!course) {
        throw createHttpError.NotFound("دوره ایی با این شناسه یافت نشد .")
    }
    return course;
}

async function checkExistBlog(id) {
    const blog = await BlogModel.findById(id);
    if (!blog) {
        throw new createHttpError.NotFound("بلاگی با این شناسه یافت نشد .")
    }
    return blog;
}

async function getComment(model,id) {
    const findComment = await model.findOne({ "comments._id": id }, { "comments.$": 1 });
    const comment = copyObject(findComment);
    if (!comment?.comments?.[0]) {
        throw new createHttpError.NotFound("کامنتی با این مشخصات یافت نشد.")
    }
    return comment?.comments?.[0];
}

module.exports = {
    createCommentForBlog,
    createCommentForCourse,
    createCommentForProduct

}