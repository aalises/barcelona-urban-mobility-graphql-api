import { connectionArgs, connectionFromArray } from "graphql-relay";
import type { MetroStationConnection as MetroStationConnectionType } from "../../types";
import { FilterByInputMetro } from "../inputs/FilterByInput";
import { MetroStationConnection } from "../outputs/MetroStation";

export default {
  type: MetroStationConnection,
  description: "Information about the metro stations of the city of Barcelona",
  args: {
    ...connectionArgs,
    filterBy: {
      type: FilterByInputMetro,
    },
  },
  resolve: async (
    _,
    args,
    { dataSources }
  ): Promise<MetroStationConnectionType> => {
    const { filterBy } = args;

    const stations = await (async () => {
      //We get all the stations if no filter provided, if not we get the lines stations
      if (!filterBy?.lineId && !filterBy?.lineName) {
        return await dataSources.metro.getAllStations();
      }
      return await dataSources.metro.getLineStations({
        id: filterBy?.lineId ?? null,
        name: filterBy?.lineName ?? null,
      });
    })();

    return connectionFromArray(stations, args) as MetroStationConnectionType;
  },
};
