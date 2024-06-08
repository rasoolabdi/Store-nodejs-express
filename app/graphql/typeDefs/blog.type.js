const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { UserType, PublicCatgoryType } = require("./public.types");
const { CommentType } = require("./comment.type");


const BlogType = new GraphQLObjectType({
    name: "BlogType",
    fields: {
        _id: {type: GraphQLString},
        author: {type: UserType},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        image: {type: GraphQLString},
        imageURL: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: PublicCatgoryType},
        comments: {type: new GraphQLList(CommentType)}
    }
});

module.exports = {
    BlogType
}
