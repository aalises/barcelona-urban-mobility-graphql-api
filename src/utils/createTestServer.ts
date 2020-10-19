import { ApolloServer } from "apollo-server-lambda";
import schema from "../schema";
import MetroStationsDataSource from "../datasources/MetroStationsDataSource";

interface TestServer {
  server: ApolloServer;
  metroStations: MetroStationsDataSource;
}

const createTestServer = (): TestServer => {
  const metroStations = new MetroStationsDataSource();

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      metroStations,
    }),
  });

  return { server, metroStations };
};

export default createTestServer;
