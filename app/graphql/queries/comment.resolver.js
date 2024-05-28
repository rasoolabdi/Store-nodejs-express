const { GraphQLString } = require("graphql");
const { CommentType } = require("../typeDefs/comment.type");
const BlogModel = require("../../models/blogs");
const createHttpError = require("http-errors");
const { VerifyAccessTokenInGraphQL } = require("../../middlewares/verifyAccessToken");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.types");

const createCommentForBlog = {
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        blogID: {type: GraphQLString},
        parent: {type: GraphQLString}
    },
    resolve: async (_,args,context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInGraphQL(req);
        const {comment , blogID , parent} = args;
        await checkExistBlog(blogID);
        BlogModel.updateOne({_id: blogID} , {
            $push: {
                comments: {
                    comment,
                    user: user._id,
                    show: false,
                    openToComment: !parent
                }
            }
        })
        return {
            statusCode : HttpStatus.CREATED,
            data: {
                message: "ثبت نظر با موفقیت انجام شد. پس از تایید در وب سایت قرار میگیرد."
            }
        };
    }
}


async function checkExistBlog(id) {
    const blog = await BlogModel.findById(id);
    if(!blog) {
        throw createHttpError.NotFound("بلاگی با این شناسه یافت نشد .")
    }
    return blog;
}
module.exports = {
    createCommentForBlog
}