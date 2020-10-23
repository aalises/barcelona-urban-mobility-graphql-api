import {
  connectionArgs,
  ConnectionArguments,
  connectionFromArray,
} from "graphql-relay";
import type {
  MetroStations as MetroStationsType,
  MetroStationConnection as MetroStationConnectionType,
} from "../../types";
import { MetroStationConnection } from "../outputs/MetroStation";
import { GraphQLObjectType, GraphQLInt } from "graphql";

const MetroStations = new GraphQLObjectType({
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

export default {
  type: MetroStations,
  args: connectionArgs,
  resolve: async (
    _,
    args: ConnectionArguments,
    { dataSources }
  ): Promise<MetroStationsType> => {
    const {
      numberOfStations,
      stations,
    } = await dataSources.metroStations.getAllStations();

    return {
      numberOfStations,
      stations: connectionFromArray(
        stations,
        args
      ) as MetroStationConnectionType,
    };
  },
};
