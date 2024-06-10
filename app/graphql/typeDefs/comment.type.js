const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLInt } = require("graphql");
const { UserType } = require("./public.types");


const CommentAnswerType = new GraphQLObjectType({
    name: "CommentAnswerType",
    fields: {
        _id: {type: GraphQLString},
        user : {type: UserType},
        comment: {type: GraphQLString},
        show: {type: GraphQLBoolean},
        createdAt: {type: GraphQLInt}
    }
})

const CommentType = new GraphQLObjectType({
    name : "CommentType",
    fields: {
        _id: {type: GraphQLString},
        user : {type: UserType},
        comment: {type: GraphQLString},
        answers: {type: new GraphQLList(CommentAnswerType)},
        show: {type: GraphQLBoolean},
        openToComment: {type: GraphQLBoolean},
        createdAt: {type: GraphQLInt}
    }
})

module.exports = {
    CommentType
}