const { GraphQLList } = require("graphql");
const { BlogType } = require("../typeDefs/blog.type");
const BlogModel = require("../../models/blogs");
const { VerifyAccessTokenInGraphQL } = require("../../middlewares/verifyAccessToken");


const BlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args , context) => {
        console.log(context?.req?.body?.variables?.authorization);
        VerifyAccessTokenInGraphQL(context?.req?.body?.variables)
        return await BlogModel.find({}).populate([{path: "author"} , {path: "category"}]);
    }
}

module.exports = {
    BlogResolver
}