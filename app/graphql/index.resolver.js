const { GraphQLObjectType, GraphQLSchema } = require("graphql");



const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {

    }
});

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {

    }
});

const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

module.exports = {
    graphQLSchema
}