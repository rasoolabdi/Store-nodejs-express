const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryType } = require("../typeDefs/category.type");
const CategoryModel = require("../../models/categories");


const CategoryResolver = {
    type: new GraphQLList(CategoryType),
    // args: {
    //     field: {type: GraphQLString},
    //     authorizationToken : {type: GraphQLString}
    // },
    resolve: async (obj , args , context , info) => { // (obj , args , context , info)
        // console.log(args);
        // console.log(context); 
        // console.log(info);
        return await CategoryModel.find({parent : undefined});
    }
}

const CategoryChildReslver = {
    type: new GraphQLList(CategoryType),
    args: {
        parent : {type: GraphQLString}
    },
    resolve: async (_ , args) => {
        const {parent} = args;
        const categoryChild = await CategoryModel.find({ parent });
        return categoryChild;
    }
}

module.exports = {
    CategoryResolver,
    CategoryChildReslver
}