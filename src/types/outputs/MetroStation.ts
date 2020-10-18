import Coordinates from "./Coordinates";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";

export default new GraphQLObjectType({
  name: "MetroStation",
  description: "Metro station information",
  fields: {
    id: {
      description: "Unique ID of the station",
      type: GraphQLID,
    },
    name: {
      description: "Name of the station",
      type: GraphQLString,
    },
    location: {
      description: "Location coordinates of the station",
      type: Coordinates,
    },
    lines: {
      description: "Lines the station belongs to e.g. L1, L2",
      type: GraphQLList(GraphQLString),
    },
  },
});
