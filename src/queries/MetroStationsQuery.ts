import MetroStation from "../types/outputs/MetroStation";
import Error from "../types/outputs/Error";
import { GraphQLUnionType } from "graphql";
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
} from "graphql-relay";
import type {
  MetroStationsQueryResponse as MetroStationsQueryResponseType,
  MetroStationConnection as MetroStationConnectionType,
} from "../types";

const { connectionType: MetroStationConnection } = connectionDefinitions({
  nodeType: MetroStation,
});

//MetroStationQuery response as a union of an error or a connection of MetroLine
const MetroStationsQueryResponse = new GraphQLUnionType({
  name: "MetroStationsQueryResponse",
  types: [Error, MetroStationConnection],
  resolveType(value) {
    return value.code !== undefined ? Error : MetroStationConnection;
  },
});

export default {
  type: MetroStationsQueryResponse,
  args: connectionArgs,
  resolve: (_, args): MetroStationsQueryResponseType => {
    return connectionFromArray(
      [
        {
          id: "43943949",
          lines: ["L1"],
          name: "Clot",
          location: {
            latitude: 2.05,
            longitude: 232.4,
          },
        },
      ],
      args
    ) as MetroStationConnectionType;
  },
};
