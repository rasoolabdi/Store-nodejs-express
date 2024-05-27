const { GraphQLList, GraphQLString } = require("graphql");
const { BlogType } = require("../typeDefs/blog.type");
const BlogModel = require("../../models/blogs");
const { VerifyAccessTokenInGraphQL } = require("../../middlewares/verifyAccessToken");


const BlogResolver = {
    type: new GraphQLList(BlogType),
    args: {
        category: {type: GraphQLString}
    },
    resolve: async (_, args , context) => {
        const {category} = args;
        const findQuery = category ? {category} : {};
        // const {authorization} = context?.req?.body?.variables?.authorization;
        // const {req} = context;
        // const user = await VerifyAccessTokenInGraphQL(context?.req?.body?.variables?.authorization);
        // const user = await VerifyAccessTokenInGraphQL(req?.body?.variables?.authorization);
        // console.log("uuuu"+user)
        // req.user = user;
        // console.log(context)
        return await BlogModel.find(findQuery).populate([{path: "author"} , {path: "category"}]);
    }
}

module.exports = {
    BlogResolver
}
