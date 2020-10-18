import { ApolloServer } from "apollo-server-lambda";
import schema from "../schema";
import MetroStationsDataSource from "../datasources/MetroStationsDataSource";
import formatError from "../utils/formatError";

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
  }),
});

exports.handler = server.createHandler();
