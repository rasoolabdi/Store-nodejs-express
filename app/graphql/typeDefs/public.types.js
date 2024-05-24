const { GraphQLObjectType, GraphQLString } = require("graphql");


const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    fields: {
        _id: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString}
    }
});

const CatgoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString}
    }
})


module.exports = {
    AuthorType,
    CatgoryType
}