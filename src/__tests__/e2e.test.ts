// import our production apollo-server instance
import { server } from "../graphql";
import { gql } from "apollo-server-lambda";
import { createTestClient } from "apollo-server-testing";

const GET_BIKE_STATION = gql`
  query getBikeStation($findBy: FindByInput!) {
    bikeStation(findBy: $findBy) {
      id
      name
    }
  }
`;

describe("Production Server - e2e", () => {
  const { query } = createTestClient(server);

  it("Gets a bike station from the production server", async () => {
    const res = await query({
      query: GET_BIKE_STATION,
      variables: { findBy: { id: 3 } },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": undefined,
        "errors": Array [
          Object {
            "extensions": Object {
              "code": "GRAPHQL_VALIDATION_FAILED",
            },
            "locations": Array [
              Object {
                "column": 5,
                "line": 3,
              },
            ],
            "message": "Cannot query field \\"id\\" on type \\"BikeStationQueryResponse\\". Did you mean to use an inline fragment on \\"BikeStation\\"?",
          },
          Object {
            "extensions": Object {
              "code": "GRAPHQL_VALIDATION_FAILED",
            },
            "locations": Array [
              Object {
                "column": 5,
                "line": 4,
              },
            ],
            "message": "Cannot query field \\"name\\" on type \\"BikeStationQueryResponse\\". Did you mean to use an inline fragment on \\"BikeStation\\"?",
          },
        ],
        "extensions": undefined,
        "http": Object {
          "headers": Headers {
            Symbol(map): Object {},
          },
        },
      }
    `);
  });
});
