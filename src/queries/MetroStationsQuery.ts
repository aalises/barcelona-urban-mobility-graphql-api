import { connectionArgs, connectionFromArray } from "graphql-relay";
import type {
  MetroStations as MetroStationsType,
  MetroStationConnection as MetroStationConnectionType,
} from "../../types";
import { MetroStationConnection } from "../outputs/MetroStation";
import { GraphQLObjectType, GraphQLInt } from "graphql";
import { FilterByInputMetro } from "../inputs/FilterByInput";

const MetroStations = new GraphQLObjectType({
  name: "MetroStations",
  description: "Information about the metro stations of the city of Barcelona",
  fields: {
    stations: {
      type: MetroStationConnection,
      description: "Connection with the data about stations",
    },
    numberOfStations: {
      type: GraphQLInt,
      description: "Total number of stations",
    },
  },
});

export default {
  type: MetroStations,
  args: {
    ...connectionArgs,
    filterBy: {
      type: FilterByInputMetro,
    },
  },
  resolve: async (_, args, { dataSources }): Promise<MetroStationsType> => {
    const { filterBy } = args;

    const { numberOfStations, stations } = await (async () => {
      //We get all the stations if no filter provided, if not we get the lines stations
      if (!filterBy?.lineId && !filterBy?.lineName) {
        return await dataSources.metro.getAllStations();
      }
      return await dataSources.metro.getLineStations({
        id: filterBy?.lineId ?? null,
        name: filterBy?.lineName ?? null,
      });
    })();

    return {
      numberOfStations,
      stations: connectionFromArray(
        stations,
        args
      ) as MetroStationConnectionType,
    };
  },
};
