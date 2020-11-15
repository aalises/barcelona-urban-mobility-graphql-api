import { ApolloServer } from "apollo-server-lambda";
import schema from "./schema";
import MetroDataSource from "./datasources/MetroDataSource";
import BikeDataSource from "./datasources/BikeDataSource";
import formatError from "./utils/formatError";
import responseCachePlugin from "apollo-server-plugin-response-cache";

const server: ApolloServer = new ApolloServer({
  schema,
  playground: {
    settings: {
      "editor.theme": "light",
    },
  },
  cacheControl: {
    defaultMaxAge: 3400,
  },
  formatError,
  introspection: true,
  dataSources: () => ({
    metro: new MetroDataSource(),
    bike: new BikeDataSource(),
  }),
  plugins: [responseCachePlugin()],
});

exports.handler = server.createHandler();
