const { GraphQLList, GraphQLString } = require("graphql");
const { ProductType } = require("../typeDefs/product.type");
const ProductModel = require("../../models/products");


const ProductResolver = {
    type: new GraphQLList(ProductType),
    args: {
        category: {type: GraphQLString}
    },
    resolve: async (_,args) => {
        const {category} = args;
        const findQuery = category ? {category} : {};
        return await ProductModel.find(findQuery).populate([{path: "supplier"} , {path: "category"}]);
    }
}

module.exports = {
    ProductResolver
}