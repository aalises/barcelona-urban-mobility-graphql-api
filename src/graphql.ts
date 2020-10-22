import { ApolloServer } from "apollo-server-lambda";
import schema from "./schema";
import MetroStationsDataSource from "./datasources/MetroStationsDataSource";
import MetroLinesDataSource from "./datasources/MetroLinesDataSource";
import formatError from "./utils/formatError";

const server: ApolloServer = new ApolloServer({
  schema,
  playground: {
    settings: {
      "editor.theme": "light",
    },
  },
  formatError,
  introspection: true,
  dataSources: () => ({
    metroStations: new MetroStationsDataSource(),
    metroLines: new MetroLinesDataSource(),
  }),
});

exports.handler = server.createHandler();
