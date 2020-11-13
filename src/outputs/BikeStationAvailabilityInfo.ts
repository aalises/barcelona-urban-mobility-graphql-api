import { GraphQLObjectType, GraphQLInt } from "graphql";

export default new GraphQLObjectType({
  name: "BikeStationAvailabilityInfo",
  description: "Information about the available bikes and docks of the station",
  fields: {
    bikes: {
      description: "Number of available bikes in the station by type",
      type: new GraphQLObjectType({
        name: "BikeAvailabilityInfo",
        description:
          "Information of the bike availability of a station by type",
        fields: {
          electrical: {
            description: "Number of available electrical bikes in the station",
            type: GraphQLInt,
          },
          mechanical: {
            description: "Number of available mechanical bikes in the station",
            type: GraphQLInt,
          },
          total: {
            description: "Total number of available bikes in the station",
            type: GraphQLInt,
          },
        },
      }),
    },
    docks: {
      description: "Number of available docks in the station",
      type: GraphQLInt,
    },
  },
});
