import { ApolloServer } from "apollo-server-lambda";
import schema from "../schema";
import MetroDataSource from "../datasources/MetroDataSource";
import BikeDataSource from "../datasources/BikeDataSource";

interface TestServer {
  server: ApolloServer;
  metro: MetroDataSource;
  bike: BikeDataSource;
}

const createTestServer = (): TestServer => {
  const metro = new MetroDataSource();
  const bike = new BikeDataSource();

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      metro,
      bike,
    }),
  });

  return { server, metro, bike };
};

export default createTestServer;
