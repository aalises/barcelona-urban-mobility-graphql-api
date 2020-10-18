import {
  connectionArgs,
  ConnectionArguments,
  connectionFromArray,
} from "graphql-relay";
import type {
  BusStops as BusStopsType,
  BusStopConnection as BusStopConnectionType,
} from "../../types";

import BusStopsQueryResponse from "../types/outputs/BusStopsQueryResponse";

export default {
  type: BusStopsQueryResponse,
  args: connectionArgs,
  resolve: async (
    _,
    args: ConnectionArguments,
    { dataSources }
  ): Promise<BusStopsType> => {
    const { numberOfStops, stops } = { numberOfStops: 1, stops: [] };

    return {
      numberOfStops,
      stops: connectionFromArray(stops, args) as BusStopConnectionType,
    };
  },
};
