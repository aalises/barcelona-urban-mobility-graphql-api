import { connectionArgs, connectionFromArray } from "graphql-relay";
import type {
  FilterByInputBike as FilterByInputBikeType,
  BikeStation as BikeStationType,
  BikeStationConnection as BikeStationConnectionType,
  OnlyFilterByInputBike,
} from "../../types";
import { BikeStationConnection } from "../outputs/BikeStation";
import { FilterByInputBike } from "../inputs/FilterByInput";

const filterBikeStations = (
  station: BikeStationType,
  filterBy: FilterByInputBikeType
): boolean => {
  if (!filterBy) {
    return true;
  }

  const { only } = filterBy;

  const filteringConditions: Record<keyof OnlyFilterByInputBike, boolean> = {
    hasAvailableBikes: Number(station?.available?.bikes?.total ?? null) > 0,
    hasAvailableDocks: Number(station?.available?.docks ?? null) > 0,
    hasAvailableElectricalBikes:
      Number(station?.available?.bikes?.electrical ?? null) > 0,
    isInService: station?.status === "IN_SERVICE",
  };

  //If one filter condition for a present flag is not met, filter the item out
  const hasFilterableCondition = Object.entries(filteringConditions).reduce(
    (acc, [key, value]) => {
      const property = only?.[key] ?? null;

      if (property && !value) {
        return false;
      }

      return acc;
    },
    true
  );

  return hasFilterableCondition;
};

export default {
  type: BikeStationConnection,
  description:
    "Information about the public bike stations (SMOU) of the city of Barcelona",
  args: {
    ...connectionArgs,
    filterBy: {
      type: FilterByInputBike,
    },
  },
  resolve: async (
    _,
    args,
    { dataSources }
  ): Promise<BikeStationConnectionType> => {
    const bikeStations = await dataSources.bike.getAllStations();

    return connectionFromArray(
      bikeStations.filter((station) =>
        filterBikeStations(station, args.filterBy)
      ),
      args
    ) as BikeStationConnectionType;
  },
};
