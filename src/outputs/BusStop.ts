import Location from "./Location";
import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { connectionDefinitions } from "graphql-relay";

const BusStop = new GraphQLObjectType({
  name: "BusStop",
  description: "Bus stop information",
  fields: {
    id: {
      description: "Unique ID of the stop",
      type: GraphQLID,
    },
    name: {
      description: "Name of the stop",
      type: GraphQLString,
    },
    location: {
      description: "Location of the stop",
      type: Location,
    },
  },
});

const { connectionType: BusStopConnection } = connectionDefinitions({
  nodeType: BusStop,
});

export { BusStopConnection, BusStop as default };
