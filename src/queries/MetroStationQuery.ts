import { ValidationError } from "apollo-server-lambda";
import type {
  MetroStation as MetroStationType,
  RootQueryMetroStationArgs as MetroStationQueryArgsType,
} from "../../types";
import MetroStation from "../outputs/MetroStation";
import FindByInput from "../inputs/FindByInput";
import { GraphQLNonNull } from "graphql";

export default {
  type: MetroStation,
  args: {
    findBy: {
      type: new GraphQLNonNull(FindByInput),
    },
  },
  resolve: async (_, args, { dataSources }): Promise<MetroStationType> => {
    const { findBy }: MetroStationQueryArgsType = args;

    if (!findBy.id && !findBy.name) {
      throw new ValidationError(
        "You have to provide either a non empty ID or non empty Name for the metroStation query"
      );
    }

    return await dataSources.metroStations.getStation(findBy);
  },
};
