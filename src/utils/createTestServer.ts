import { ApolloServer } from "apollo-server-lambda";
import schema from "../schema";
import MetroDataSource from "../datasources/MetroDataSource";

interface TestServer {
  server: ApolloServer;
  metro: MetroDataSource;
}

const createTestServer = (): TestServer => {
  const metro = new MetroDataSource();

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      metro,
    }),
  });

  return { server, metro };
};

export default createTestServer;
