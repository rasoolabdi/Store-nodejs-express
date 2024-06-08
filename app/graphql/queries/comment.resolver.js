const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const BlogModel = require("../../models/blogs");
const createHttpError = require("http-errors");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { VerifyAccessTokenInGraphQL } = require("../../middlewares/verifyAccessToken");
const { copyObject } = require("../../utils/function");
const { default: mongoose } = require("mongoose");


const createCommentForBlog = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },
        blogId: { type: GraphQLString },
        parent: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const {req} = context;
        console.log("token" + context?.req?.body?.variables?.authorization);
        const user = await VerifyAccessTokenInGraphQL(req?.body?.variables?.authorization);
        console.log("user"+user);
        const { comment, blogId, parent } = args;
        await checkExistBlog(blogId);
        let commentDocument;
        if (parent && mongoose.isValidObjectId(parent)) {
            commentDocument = await getComment(parent);
        }
        if (commentDocument && !commentDocument?.openToComment) {
            throw new createHttpError.BadRequest("ثبت پاسخ مجاز نیست .");
        }
        BlogModel.updateOne({ _id: blogId }, {
            $push: {
                comments: {
                    comment,
                    user: user._id,
                    show: false,
                    openToComment: !parent,
                    parent: mongoose.isValidObjectId(parent) ? parent : undefined
                }
            }
        });
        return {
            statusCode: HttpStatus.CREATED,
            data: {
                message: "ثبت نظر با موفقیت انجام شد . نظر شما پس از تایید قابل نمایش خواهد بود ."
            }
        }
    }
}


async function checkExistBlog(id) {
    const blog = await BlogModel.findById(id);
    if (!blog) {
        throw new createHttpError.NotFound("بلاگی با این شناسه یافت نشد .")
    }
    return blog;
}

async function getComment(id) {
    const findComment = await BlogModel.findOne({ "comments._id": id }, { "comments.$": 1 });
    const comment = copyObject(findComment);
    if (!comment?.comments?.[0]) {
        throw new createHttpError.NotFound("کامنتی با این مشخصات یافت نشد.")
    }
    return comment?.comments?.[0];
}

module.exports = {
    createCommentForBlog,

}