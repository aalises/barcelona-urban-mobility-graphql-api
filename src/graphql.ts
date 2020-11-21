import { ApolloServer } from "apollo-server-lambda";
import schema from "./schema";
import MetroDataSource from "./datasources/MetroDataSource";
import BikeDataSource from "./datasources/BikeDataSource";
import formatError from "./utils/formatError";
import responseCachePlugin from "apollo-server-plugin-response-cache";

const exampleQuery = `# Welcome to the Barcelona urban mobility GraphQL API
#
# Here is an example query to get you started, 
# which gets the closest bike station from the design museum of BCN,
# and the first three metro stations from the L4,
# simply press play to fetch the information, or refer to the docs tab on the left
# to create your own queries ✨

{
  station: bikeStation(
    findBy: { closest: { latitude: 41.402451, longitude: 2.1880918 } }
  ) {
    name
    location {
      longitude
      latitude
    }
    available {
      bikes {
        electrical
        mechanical
      }
    }
  }
  stations: metroStations(
    filterBy: { lineId: 4 }
    first: 3
  ) {
    edges {
      node {
        id
        name
      }
    }
  }
}
`;

export const server: ApolloServer = new ApolloServer({
  schema,
  playground: {
    settings: {
      "editor.theme": "light",
    },
    tabs: [
      {
        endpoint: "/graphql",
        name: "Example Query",
        query: exampleQuery,
      },
    ],
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
