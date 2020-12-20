import { connectionArgs, connectionFromArray } from "graphql-relay";
import type { BusStopConnectionType } from "../../types";
import { BusStopConnection } from "../outputs/BusStop";

export default {
  type: BusStopConnection,
  description: "Information about the bus stops of the city of Barcelona",
  args: connectionArgs,
  resolve: async (_, args, { dataSources }): Promise<BusStopConnectionType> => {
    const stops = await dataSources.bus.getAllStops();
    return connectionFromArray(stops, args) as BusStopConnectionType;
  },
};
