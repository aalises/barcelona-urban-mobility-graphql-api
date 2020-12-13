import { ApolloServer } from "apollo-server-lambda";
import schema from "../schema";
import MetroDataSource from "../datasources/MetroDataSource";
import BikeDataSource from "../datasources/BikeDataSource";
import BusDataSource from "../datasources/BusDataSource";

interface TestServer {
  server: ApolloServer;
  metro: MetroDataSource;
  bike: BikeDataSource;
  bus: BusDataSource;
}

const createTestServer = (): TestServer => {
  const metro = new MetroDataSource();
  const bike = new BikeDataSource();
  const bus = new BusDataSource();

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      metro,
      bike,
      bus,
    }),
  });

  return { server, metro, bike, bus };
};

export default createTestServer;
