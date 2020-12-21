import { connectionArgs, connectionFromArray } from "graphql-relay";
import type { BusStopConnectionType } from "../../types";
import { BusStopConnection } from "../outputs/BusStop";
import { FilterByInputBus } from "../inputs/FilterByInput";

export default {
  type: BusStopConnection,
  description: "Information about the bus stops of the city of Barcelona",
  args: {
    ...connectionArgs,
    filterBy: {
      type: FilterByInputBus,
    },
  },
  resolve: async (_, args, { dataSources }): Promise<BusStopConnectionType> => {
    const { filterBy } = args;

    const stops = await (async () => {
      if (!filterBy?.lineId) {
        return await dataSources.bus.getAllStops();
      }
      return await dataSources.bus.getLineStops({
        id: filterBy?.lineId ?? null,
      });
    })();

    return connectionFromArray(stops, args) as BusStopConnectionType;
  },
};
