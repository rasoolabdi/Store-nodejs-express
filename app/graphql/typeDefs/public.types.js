const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLScalarType, Kind } = require("graphql");
const { toObject, parseLiteral } = require("../utils");

const AnyType = new GraphQLScalarType({
    name: "anyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral
});

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: {
        _id: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString}
    }
});

const PublicCatgoryType = new GraphQLObjectType({
    name: "PublicCatgoryType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        children : {type: new GraphQLList(AnyType)}
    }
});

const ResponseType = new GraphQLObjectType({
    name: "ResponseType",
    fields: {
        statusCode: {type: GraphQLString},
        data: {type: AnyType}
    }
})


module.exports = {
    UserType,
    PublicCatgoryType,
    AnyType,
    ResponseType
}