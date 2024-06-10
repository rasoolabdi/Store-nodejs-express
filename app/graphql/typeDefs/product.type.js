const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { UserType, PublicCatgoryType } = require("./public.types");
const { CommentType } = require("./comment.type");

const FeaturesType = new GraphQLObjectType({
    name: "Featares",
    fields: {
        length: {type: GraphQLString},
        height: {type: GraphQLString},
        weight: {type: GraphQLString},
        width:  {type: GraphQLString},
        colors: {type: new GraphQLList(GraphQLString)},
        madein: {type: GraphQLString}
    }
});

const ProductType =  new GraphQLObjectType({
    name: "ProductType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        supplier: {type: UserType},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        images: {type: new GraphQLList(GraphQLString)},
        imagesURL: {type: new GraphQLList(GraphQLString)},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: PublicCatgoryType},
        price: {type: GraphQLInt},
        count: {type: GraphQLInt},
        discount: {type: GraphQLInt},
        type: {type: GraphQLString},
        features: {type: FeaturesType},
        comments: {type: new GraphQLList(CommentType)}
    }
});

module.exports = {
    ProductType
}