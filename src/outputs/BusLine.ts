import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql";
import BusStop, { BusStopConnection } from "./BusStop";
import {
  connectionArgs,
  ConnectionArguments,
  connectionFromArray,
  connectionDefinitions,
} from "graphql-relay";

const BusLine = new GraphQLObjectType({
  name: "BusLine",
  description: "Bus line information",
  fields: {
    id: {
      description: "Numeric Code of the line",
      type: GraphQLInt,
    },
    name: {
      description: "Name of the line",
      type: GraphQLString,
    },
    originStop: {
      description: "Origin stop of the line",
      type: BusStop,
    },
    endingStop: {
      description: "Ending stop of the line",
      type: BusStop,
    },
    stops: {
      description: "Stops of the line",
      args: connectionArgs,
      type: BusStopConnection,
      resolve: ({ stops }, args: ConnectionArguments) => {
        if (!stops) {
          return null;
        }
        return connectionFromArray(stops, args);
      },
    },
    color: {
      description: "Color of the line represented as a Hexadecimal string",
      type: GraphQLString,
    },
  },
});

const { connectionType: BusLineConnection } = connectionDefinitions({
  nodeType: BusLine,
});

export { BusLine as default, BusLineConnection };
