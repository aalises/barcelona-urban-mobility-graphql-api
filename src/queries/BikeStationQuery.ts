import { ValidationError } from "apollo-server-lambda";
import type {
  BikeStationQueryResponseType,
  RootQueryBikeStationArgsType,
} from "../../types";
import BikeStation from "../outputs/BikeStation";
import FindByInput from "../inputs/FindByInput";
import { NotFoundError } from "../outputs/Errors";
import { GraphQLNonNull, GraphQLUnionType } from "graphql";

export const BikeStationQueryResponse = new GraphQLUnionType({
  name: "BikeStationQueryResponse",
  types: [BikeStation, NotFoundError],
  resolveType(value) {
    return value.params !== undefined ? NotFoundError : BikeStation;
  },
});

export default {
  type: BikeStationQueryResponse,
  description: "Returns the information about a bike station",
  args: {
    findBy: {
      type: new GraphQLNonNull(FindByInput),
    },
  },
  resolve: async (
    _,
    args,
    { dataSources }
  ): Promise<BikeStationQueryResponseType | null> => {
    const { findBy }: RootQueryBikeStationArgsType = args;

    if (!findBy.id && !findBy.name && !findBy.closest) {
      throw new ValidationError(
        "You have to provide either a non empty ID, non empty Name or closest coordinates for the bikeStation query"
      );
    }

    return await dataSources.bike.getStation(findBy);
  },
};
