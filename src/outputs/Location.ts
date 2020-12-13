import { GraphQLObjectType, GraphQLString } from "graphql";
import { CoordinatesOutput } from "./Coordinates";

export default new GraphQLObjectType({
  name: "Location",
  description: "Location of a stop/station",
  fields: {
    address: {
      type: GraphQLString,
    },
    city: {
      type: GraphQLString,
    },
    district: {
      type: GraphQLString,
    },
    street: {
      type: GraphQLString,
    },
    coordinates: {
      type: CoordinatesOutput,
    },
  },
});
