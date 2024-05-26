const { GraphQLList } = require("graphql");
const { BlogType } = require("../typeDefs/blog.type");
const BlogModel = require("../../models/blogs");
const { VerifyAccessTokenInGraphQL } = require("../../middlewares/verifyAccessToken");


const BlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args , context) => {
        // const {authorization} = context?.req?.body?.variables?.authorization;
        // const {req} = context;
        // const user = await VerifyAccessTokenInGraphQL(context?.req?.body?.variables?.authorization);
        // const user = await VerifyAccessTokenInGraphQL(req?.body?.variables?.authorization);
        // console.log("uuuu"+user)
        // req.user = user;
        // console.log(context)
        return await BlogModel.find({}).populate([{path: "author"} , {path: "category"}]);
    }
}

module.exports = {
    BlogResolver
}
