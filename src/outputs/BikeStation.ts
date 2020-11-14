import Coordinates from "./Coordinates";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import { connectionDefinitions } from "graphql-relay";
import BikeStationAvailabilityInfo from "./BikeStationAvailabilityInfo";
import BikeStationStatus from "./enums/BikeStationStatus";

const BikeStation = new GraphQLObjectType({
  name: "BikeStation",
  description: "Bike station information",
  fields: {
    id: {
      description: "Unique ID of the station",
      type: GraphQLID,
    },
    status: {
      description: "Status of the station e.g. IN_SERVICE",
      type: BikeStationStatus,
    },
    lastUpdated: {
      description: "Last updated information timestamp (in ms since epoch)",
      type: GraphQLInt,
    },
    name: {
      description: "Name of the station",
      type: GraphQLString,
    },
    capacity: {
      description: "Total number of bikes the station has",
      type: GraphQLInt,
    },
    location: {
      description: "Location coordinates of the station",
      type: Coordinates,
    },
    available: {
      description:
        "Information about the available bikes and docks of the station",
      type: BikeStationAvailabilityInfo,
    },
  },
});

const { connectionType: BikeStationConnection } = connectionDefinitions({
  nodeType: BikeStation,
});

export { BikeStationConnection, BikeStation as default };
