import { ValidationError } from "apollo-server-lambda";
import BusLine from "../outputs/BusLine";
import FindByInput from "../inputs/FindByInput";
import { BusLineQueryResponseType } from "../../types";

import { NotFoundError } from "../outputs/Errors";
import { GraphQLNonNull, GraphQLUnionType } from "graphql";

export const BusLineQueryResponse = new GraphQLUnionType({
  name: "BusLineQueryResponse",
  types: [BusLine, NotFoundError],
  resolveType(value) {
    return value.params !== undefined ? NotFoundError : BusLine;
  },
});

export default {
  type: BusLineQueryResponse,
  description: "Returns the information about a bus line",
  args: {
    findBy: {
      type: new GraphQLNonNull(FindByInput),
    },
  },
  resolve: async (
    _,
    args,
    { dataSources }
  ): Promise<BusLineQueryResponseType | null> => {
    const { findBy } = args;

    if (!findBy.id && !findBy.name) {
      throw new ValidationError(
        "You have to provide either a non empty ID or non empty Name for the busLine query"
      );
    }

    return await dataSources.bus.getLine(findBy);
  },
};
