const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const { PublicCatgoryType, UserType } = require("./public.types");

const EpisodeType = new GraphQLObjectType({
    name: "EpisodeType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        text: {type: GraphQLString},
        type: {type: GraphQLString},
        time: {type: GraphQLString},
        videoAddress: {type: GraphQLString},
        videoURL: {type: GraphQLString}
    }
})


const ChaptersType = new GraphQLObjectType({
    name: "ChapterType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        text: {type: GraphQLString},
        episodes: {type: new GraphQLList(EpisodeType)}

    }
})

const CourseType = new GraphQLObjectType({
    name: "CourseType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        image: {type: GraphQLString},
        imageURL: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: PublicCatgoryType},
        price: {type: GraphQLInt},
        count: {type: GraphQLInt},
        discount: {type: GraphQLInt},
        type: {type: GraphQLString},
        status: {type: GraphQLString},
        teacher: {type: UserType},
        chapters: {type: new GraphQLList(ChaptersType)}
    }
});

module.exports = {
    CourseType,
    ChaptersType,
    EpisodeType
}