import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

export default new GraphQLObjectType({
  name: "Error",
  description: "Generic Error",
  fields: {
    code: {
      type: GraphQLInt,
      description: "HTTP Status Code of the Error",
    },
    message: {
      type: GraphQLString,
      description: "Error Description",
    },
  },
});
