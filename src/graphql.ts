import { ApolloServer } from "apollo-server-lambda";
import schema from "./schema";
import MetroDataSource from "./datasources/MetroDataSource";
import BikeDataSource from "./datasources/BikeDataSource";
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
    metro: new MetroDataSource(),
    bike: new BikeDataSource(),
  }),
});

exports.handler = server.createHandler();
