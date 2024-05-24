const { GraphQLList } = require("graphql");
const { categoryType } = require("../typeDefs/category.type");
const CategoryModel = require("../../models/categories");


const CategoryResolver = {
    type: new GraphQLList(categoryType),
    resolve: async () => {
        return await CategoryModel.find({parent : undefined});
    }
}

module.exports = {
    CategoryResolver
}