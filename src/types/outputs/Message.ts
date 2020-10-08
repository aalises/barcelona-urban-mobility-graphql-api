import { GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "Message",
  description: "Just a message",
  fields: {
    message: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
  },
});
