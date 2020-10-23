import { GraphQLInt, GraphQLInputObjectType, GraphQLString } from "graphql";

export default new GraphQLInputObjectType({
  name: "FilterByInput",
  description:
    "Input for the filterBy argument of the queries, which allows filtering a connection by some parameters (e.g. lineName or lineId)",
  fields: {
    lineId: {
      type: GraphQLInt,
    },
    lineName: {
      type: GraphQLString,
    },
  },
});
