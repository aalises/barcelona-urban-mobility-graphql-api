import { ValidationError } from "apollo-server-lambda";
import type {
  BusStopQueryResponseType,
  RootQueryBusStopArgsType,
} from "../../types";
import BusStop from "../outputs/BusStop";
import { NotFoundError } from "../outputs/Errors";
import FindByInput from "../inputs/FindByInput";
import { GraphQLNonNull, GraphQLUnionType } from "graphql";

export const BusStopQueryResponse = new GraphQLUnionType({
  name: "BusStopQueryResponse",
  types: [BusStop, NotFoundError],
  resolveType(value) {
    return value.params !== undefined ? NotFoundError : BusStop;
  },
});

export default {
  type: BusStopQueryResponse,
  description: "Returns the information about a bus stop",
  args: {
    findBy: {
      type: new GraphQLNonNull(FindByInput),
    },
  },
  resolve: async (
    _,
    args,
    { dataSources }
  ): Promise<BusStopQueryResponseType | null> => {
    const { findBy }: RootQueryBusStopArgsType = args;

    if (!findBy.id && !findBy.name && !findBy.closest) {
      throw new ValidationError(
        "You have to provide either a non empty ID , non empty Name or closest coordinates for the busStop query"
      );
    }

    return await dataSources.bus.getStop(findBy);
  },
};
