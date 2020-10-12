import formatError from "../formatError";
import { GraphQLError } from "graphql";
import { ApolloError, ForbiddenError } from "apollo-server";

const createGraphqlError = (message: string, status: number): GraphQLError =>
  new GraphQLError(message, null, null, null, null, null, {
    response: { status },
  });

describe("formatError", () => {
  afterEach(() => {
    delete process.env.NODE_ENV;
  });

  it("Returns the same GraphQL Error on development mode (shows full error trace)", () => {
    process.env.NODE_ENV = "development";

    const graphQLError = createGraphqlError("message", 500);
    expect(formatError(graphQLError)).toBeInstanceOf(GraphQLError);
  });

  it("Returns ForbiddenError with the provided message when the error status is 403", () => {
    const message = "Test message";
    const error = formatError(createGraphqlError(message, 403));

    expect(error).toBeInstanceOf(ForbiddenError);
    expect(error.message).toBe(message);
  });

  it("Defaults to returning ApolloError", () => {
    const error = formatError(createGraphqlError("", 500));

    expect(error).toBeInstanceOf(ApolloError);
  });
});
