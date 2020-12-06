import { ValidationError } from "apollo-server-lambda";
import MetroLine from "../outputs/MetroLine";
import FindByInput from "../inputs/FindByInput";
import { MetroLineQueryResponseType } from "../../types";

import { NotFoundError } from "../outputs/Errors";
import { GraphQLNonNull, GraphQLUnionType } from "graphql";

export const MetroLineQueryResponse = new GraphQLUnionType({
  name: "MetroLineQueryResponse",
  types: [MetroLine, NotFoundError],
  resolveType(value) {
    return value.params !== undefined ? NotFoundError : MetroLine;
  },
});

export default {
  type: MetroLineQueryResponse,
  description: "Returns the information about a metro line",
  args: {
    findBy: {
      type: new GraphQLNonNull(FindByInput),
    },
  },
  resolve: async (
    _,
    args,
    { dataSources }
  ): Promise<MetroLineQueryResponseType | null> => {
    const { findBy } = args;

    if (!findBy.id && !findBy.name) {
      throw new ValidationError(
        "You have to provide either a non empty ID or non empty Name for the metroLine query"
      );
    }

    return await dataSources.metro.getLine(findBy);
  },
};
