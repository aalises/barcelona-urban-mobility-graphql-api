import {
  connectionArgs,
  ConnectionArguments,
  connectionFromArray,
} from "graphql-relay";

import { MetroLineConnection } from "../outputs/MetroLine";

import type { MetroLineConnectionType } from "../../types";

export default {
  type: MetroLineConnection,
  description: "Information about the metro lines of the city of Barcelona",
  args: connectionArgs,
  resolve: async (
    _,
    args: ConnectionArguments,
    { dataSources }
  ): Promise<MetroLineConnectionType> => {
    const lines = await dataSources.metro.getAllLines();
    return connectionFromArray(lines, args) as MetroLineConnectionType;
  },
};
