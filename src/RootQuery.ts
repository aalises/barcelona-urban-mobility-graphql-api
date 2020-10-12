import { GraphQLObjectType } from "graphql";

import metroStations from "./queries/MetroStationsQuery";

export default new GraphQLObjectType({
  name: "RootQuery",
  description: "Root Query",
  fields: {
    metroStations
  },
});
