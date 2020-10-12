import {
  connectionArgs,
  ConnectionArguments,
  connectionFromArray,
} from "graphql-relay";
import type {
  MetroStationsQueryResponse as MetroStationsQueryResponseType,
  MetroStationConnection as MetroStationConnectionType,
} from "../types";

import MetroStationsQueryResponse from "../types/outputs/MetroStationsQueryResponse";

export default {
  type: MetroStationsQueryResponse,
  args: connectionArgs,
  resolve: async (
    _,
    args: ConnectionArguments,
    { dataSources }
  ): Promise<MetroStationsQueryResponseType> => {
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
