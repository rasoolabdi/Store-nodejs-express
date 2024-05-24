const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { PublicCatgoryType } = require("./public.types");


const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        children : {type: new GraphQLList(PublicCatgoryType)}
    }
});

module.exports = {
    CategoryType
}