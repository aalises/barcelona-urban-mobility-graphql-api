import { GraphQLSchema } from "graphql";

import RootQuery from "./RootQuery";

const Schema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery,
});

export default Schema;
