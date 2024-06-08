const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { CategoryResolver, CategoryChildReslver } = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { createCommentForBlog } = require("./queries/comment.resolver");



const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        categories: CategoryResolver,
        childOfCategory: CategoryChildReslver,
        courses: CourseResolver,
    }
});

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        createCommentForBlog: createCommentForBlog
    }
});

const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

module.exports = {
    graphQLSchema
}