import { GraphQLObjectType } from "graphql";

import metroStations from "./queries/MetroStationsQuery";
import metroStation from "./queries/MetroStationQuery";
import metroLine from "./queries/MetroLineQuery";

export default new GraphQLObjectType({
  name: "RootQuery",
  description: "Root Query",
  fields: {
    metroStations,
    metroStation,
    metroLine,
  },
});
