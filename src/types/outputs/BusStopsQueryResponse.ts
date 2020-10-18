import BusStop from "./BusStop";
import { GraphQLObjectType, GraphQLInt } from "graphql";
import { connectionDefinitions } from "graphql-relay";

const { connectionType: BusStopConnection } = connectionDefinitions({
  nodeType: BusStop,
});

export default new GraphQLObjectType({
  name: "BusStops",
  description: "Information about the bus stops of the city of Barcelona",
  fields: {
    stops: {
      type: BusStopConnection,
      description: "Connection with the data about stops",
    },
    numberOfStops: {
      type: GraphQLInt,
      description: "Total number of stops",
    },
  },
});
