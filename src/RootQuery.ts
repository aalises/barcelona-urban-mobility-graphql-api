import { GraphQLObjectType } from "graphql";

import metroStations from "./queries/MetroStationsQuery";
import busStops from "./queries/BusStopsQuery";

export default new GraphQLObjectType({
  name: "RootQuery",
  description: "Root Query",
  fields: {
    metroStations,
    busStops,
  },
});
