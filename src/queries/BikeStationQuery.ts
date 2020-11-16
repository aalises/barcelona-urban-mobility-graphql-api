import { ValidationError } from "apollo-server-lambda";
import type {
  BikeStation as BikeStationType,
  RootQueryBikeStationArgs as BikeStationQueryArgsType,
} from "../../types";
import BikeStation from "../outputs/BikeStation";
import FindByInput from "../inputs/FindByInput";
import { GraphQLNonNull } from "graphql";

export default {
  type: BikeStation,
  description: "Returns the information about a bike station",
  args: {
    findBy: {
      type: new GraphQLNonNull(FindByInput),
    },
  },
  resolve: async (_, args, { dataSources }): Promise<BikeStationType> => {
    const { findBy }: BikeStationQueryArgsType = args;

    if (!findBy.id && !findBy.name && !findBy.closest) {
      throw new ValidationError(
        "You have to provide either a non empty ID, non empty Name or closest coordinates for the bikeStation query"
      );
    }

    return await dataSources.bike.getStation(findBy);
  },
};
