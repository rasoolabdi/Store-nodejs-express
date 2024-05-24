const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { CategoryResolver } = require("./queries/category.resolver");



const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        categories: CategoryResolver
    }
});

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {

    }
});

const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutation
});

module.exports = {
    graphQLSchema
}