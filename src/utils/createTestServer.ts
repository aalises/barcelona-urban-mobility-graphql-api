import { ApolloServer } from "apollo-server-lambda";
import schema from "../schema";
import MetroStationsDataSource from "../datasources/MetroStationsDataSource";
import MetroLinesDataSource from "../datasources/MetroLinesDataSource";

interface TestServer {
  server: ApolloServer;
  metroStations: MetroStationsDataSource;
  metroLines: MetroLinesDataSource;
}

const createTestServer = (): TestServer => {
  const metroStations = new MetroStationsDataSource();
  const metroLines = new MetroLinesDataSource();

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      metroStations,
      metroLines,
    }),
  });

  return { server, metroStations, metroLines };
};

export default createTestServer;
