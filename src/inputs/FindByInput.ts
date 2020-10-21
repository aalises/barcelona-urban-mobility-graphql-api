import { GraphQLInt, GraphQLInputObjectType, GraphQLString } from "graphql";

export default new GraphQLInputObjectType({
  name: "FindByInput",
  description:
    "Input for the FindBy argument of the queries, which allows finding an entity by some parameters (e.g. name or id)",
  fields: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
  },
});
