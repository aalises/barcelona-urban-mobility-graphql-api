import { ApolloError, ForbiddenError } from "apollo-server";
import { GraphQLError } from "graphql";

/*
This helper function formats the errors to be apollo errors on production mode.
Allows hiding some error information to the client
*/
const formatError = (error: GraphQLError): ApolloError | GraphQLError => {
  if (process.env.NODE_ENV !== "production") {
    return error;
  }

  const status = error.extensions?.response?.status;
  const message = error.message;

  if (status === 403) {
    return new ForbiddenError(message);
  }
  return new ApolloError(message);
};

export default formatError;
