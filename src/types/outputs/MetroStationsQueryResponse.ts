import MetroStation from "./MetroStation";
import { GraphQLObjectType, GraphQLInt } from "graphql";
import { connectionDefinitions } from "graphql-relay";

const { connectionType: MetroStationConnection } = connectionDefinitions({
  nodeType: MetroStation,
});

export default new GraphQLObjectType({
  name: "MetroStations",
  description: "Information about the metro stations of the city of Barcelona",
  fields: {
    stations: {
      type: MetroStationConnection,
      description: "Connection with the data about stations",
    },
    numberOfStations: {
      type: GraphQLInt,
      description: "Total number of stations",
    },
  },
});
