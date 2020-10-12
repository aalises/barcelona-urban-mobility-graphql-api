import { ApolloServer } from "apollo-server";
import schema from "./schema";
import MetroStationsDataSource from "./datasources/MetroStationsDataSource";

const server: ApolloServer = new ApolloServer({
  schema,
  playground: {
    settings: {
      "editor.theme": "light",
    },
  },
  introspection: true,
  dataSources: () => ({
    metroStations: new MetroStationsDataSource(),
  }),
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => console.log("Module disposed."));
}
