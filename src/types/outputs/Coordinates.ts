import { GraphQLFloat, GraphQLObjectType } from "graphql";

export default new GraphQLObjectType({
  name: "Coordinates",
  description:
    "Coordinates (Latitude, Longitude, Altitude), of a given station/stop",
  fields: {
    latitude: {
      type: GraphQLFloat,
    },
    longitude: {
      type: GraphQLFloat,
    },
    altitude: {
      type: GraphQLFloat,
    },
  },
});
