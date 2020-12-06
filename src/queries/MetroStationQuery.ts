import { ValidationError } from "apollo-server-lambda";
import type {
  MetroStationQueryResponseType,
  RootQueryMetroStationArgsType,
} from "../../types";
import MetroStation from "../outputs/MetroStation";
import { NotFoundError } from "../outputs/Errors";
import FindByInput from "../inputs/FindByInput";
import { GraphQLNonNull, GraphQLUnionType } from "graphql";

export const MetroStationQueryResponse = new GraphQLUnionType({
  name: "MetroStationQueryResponse",
  types: [MetroStation, NotFoundError],
  resolveType(value) {
    return value.params !== undefined ? NotFoundError : MetroStation;
  },
});

export default {
  type: MetroStationQueryResponse,
  description: "Returns the information about a metro station",
  args: {
    findBy: {
      type: new GraphQLNonNull(FindByInput),
    },
  },
  resolve: async (
    _,
    args,
    { dataSources }
  ): Promise<MetroStationQueryResponseType | null> => {
    const { findBy }: RootQueryMetroStationArgsType = args;

    if (!findBy.id && !findBy.name && !findBy.closest) {
      throw new ValidationError(
        "You have to provide either a non empty ID , non empty Name or closest coordinates for the metroStation query"
      );
    }

    return await dataSources.metro.getStation(findBy);
  },
};
