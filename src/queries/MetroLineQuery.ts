import { ValidationError } from "apollo-server-lambda";
import MetroLine from "../outputs/MetroLine";
import FindByInput from "../inputs/FindByInput";
import { GraphQLNonNull } from "graphql";
import { MetroLine as MetroLineType } from "../../types";
export default {
  type: MetroLine,
  description: "Returns the information about a metro line",
  args: {
    findBy: {
      type: new GraphQLNonNull(FindByInput),
    },
  },
  resolve: async (_, args, { dataSources }): Promise<MetroLineType | null> => {
    const { findBy } = args;

    if (!findBy.id && !findBy.name) {
      throw new ValidationError(
        "You have to provide either a non empty ID or non empty Name for the metroLine query"
      );
    }

    return await dataSources.metro.getLine(findBy);
  },
};
