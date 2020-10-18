import Coordinates from "./Coordinates";
import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "BusStop",
  description: "Bus stop information",
  fields: {
    id: {
      description: "Unique ID of the stop",
      type: GraphQLID,
    },
    name: {
      description: "Name of the stop",
      type: GraphQLString,
    },
    location: {
      description: "Location coordinates of the stop",
      type: Coordinates,
    },
  },
});
