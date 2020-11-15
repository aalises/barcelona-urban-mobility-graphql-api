import { CoordinatesOutput } from "./Coordinates";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { connectionDefinitions } from "graphql-relay";

const MetroStation = new GraphQLObjectType({
  name: "MetroStation",
  description: "Metro station information",
  fields: {
    id: {
      description: "Unique ID of the station",
      type: GraphQLID,
    },
    name: {
      description: "Name of the station",
      type: GraphQLString,
    },
    location: {
      description: "Location coordinates of the station",
      type: CoordinatesOutput,
    },
    lines: {
      description: "Lines the station belongs to e.g. L1, L2",
      type: GraphQLList(GraphQLString),
    },
  },
});

const { connectionType: MetroStationConnection } = connectionDefinitions({
  nodeType: MetroStation,
});

export { MetroStationConnection, MetroStation as default };
