import {
  connectionArgs,
  ConnectionArguments,
  connectionFromArray,
} from "graphql-relay";

import { MetroLineConnection } from "../outputs/MetroLine";
import { GraphQLObjectType, GraphQLInt } from "graphql";

import type {
  MetroLines as MetroLinesType,
  MetroLineConnection as MetroLineConnectionType,
} from "../../types";

const MetroLines = new GraphQLObjectType({
  name: "MetroLines",
  description: "Information about the metro lines of the city of Barcelona",
  fields: {
    lines: {
      type: MetroLineConnection,
      description: "Connection with the data about lines",
    },
    numberOfLines: {
      type: GraphQLInt,
      description: "Total number of lines",
    },
  },
});

export default {
  type: MetroLines,
  args: connectionArgs,
  resolve: async (
    _,
    args: ConnectionArguments,
    { dataSources }
  ): Promise<MetroLinesType> => {
    const { numberOfLines, lines } = await dataSources.metro.getAllLines();

    return {
      numberOfLines,
      lines: connectionFromArray(lines, args) as MetroLineConnectionType,
    };
  },
};
