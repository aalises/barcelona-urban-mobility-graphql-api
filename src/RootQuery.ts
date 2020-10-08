import { GraphQLObjectType } from "graphql";

import message from "./queries/MessageQuery";

export default new GraphQLObjectType({
  name: "RootQuery",
  description: "Root Query",
  fields: {
    message,
  },
});
