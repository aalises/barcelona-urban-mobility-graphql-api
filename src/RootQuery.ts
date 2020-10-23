import { GraphQLObjectType } from "graphql";

import metroStation from "./queries/MetroStationQuery";
import metroStations from "./queries/MetroStationsQuery";

import metroLine from "./queries/MetroLineQuery";
import metroLines from "./queries/MetroLinesQuery";

export default new GraphQLObjectType({
  name: "RootQuery",
  description: "Root Query",
  fields: {
    metroStations,
    metroStation,
    metroLine,
    metroLines,
  },
});
