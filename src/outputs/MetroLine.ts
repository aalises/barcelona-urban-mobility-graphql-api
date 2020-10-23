import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import MetroStation, { MetroStationConnection } from "./MetroStation";
import {
  connectionArgs,
  ConnectionArguments,
  connectionFromArray,
  connectionDefinitions,
} from "graphql-relay";

const MetroLine = new GraphQLObjectType({
  name: "MetroLine",
  description: "Metro line information",
  fields: {
    id: {
      description: "Numeric Code of the line",
      type: GraphQLInt,
    },
    name: {
      description: "Name of the line",
      type: GraphQLString,
    },
    originStation: {
      description: "Origin station of the line",
      type: MetroStation,
    },
    endingStation: {
      description: "Ending station of the line",
      type: MetroStation,
    },
    stations: {
      description: "Stations of the line",
      args: connectionArgs,
      type: MetroStationConnection,
      resolve: ({ stations }, args: ConnectionArguments) => {
        if (!stations) {
          return null;
        }
        return connectionFromArray(stations, args);
      },
    },
    color: {
      description: "Color of the line represented as a Hexadecimal string",
      type: GraphQLString,
    },
  },
});

const { connectionType: MetroLineConnection } = connectionDefinitions({
  nodeType: MetroLine,
});

export { MetroLine as default, MetroLineConnection };
