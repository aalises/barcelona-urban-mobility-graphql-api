import { GraphQLObjectType } from "graphql";
import GraphQLJSON from "graphql-type-json";

export const NotFoundError = new GraphQLObjectType({
  name: "NotFoundError",
  fields: () => ({
    params: {
      type: GraphQLJSON,
      description: "Search params that resulted in a not found error",
      resolve: ({ params }) => {
        //We filter out the nullish params
        return Object.entries(params).reduce(
          (acc, [key, value]) =>
            value == null ? acc : ((acc[key] = value), acc),
          {}
        );
      },
    },
  }),
});
