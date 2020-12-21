import {
  connectionArgs,
  ConnectionArguments,
  connectionFromArray,
} from "graphql-relay";

import { BusLineConnection } from "../outputs/BusLine";

import type { BusLineConnectionType } from "../../types";

export default {
  type: BusLineConnection,
  description: "Information about the bus lines of the city of Barcelona",
  args: connectionArgs,
  resolve: async (
    _,
    args: ConnectionArguments,
    { dataSources }
  ): Promise<BusLineConnectionType> => {
    const lines = await dataSources.bus.getAllLines();
    return connectionFromArray(lines, args) as BusLineConnectionType;
  },
};
