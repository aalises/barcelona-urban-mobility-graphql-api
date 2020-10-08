import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server: ApolloServer = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
});

// The `listen` method launches a web server.
server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => console.log("Module disposed. "));
}
