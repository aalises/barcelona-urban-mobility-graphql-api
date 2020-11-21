// import our production apollo-server instance
import { server } from "../graphql";
import { gql } from "apollo-server-lambda";
import { createTestClient } from "apollo-server-testing";

const GET_BIKE_STATION = gql`
  query getBikeStation($findBy: FindByInput!) {
    bikeStation(findBy: $findBy) {
      ... on BikeStation {
        id
        name
      }
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
        "data": Object {
          "bikeStation": Object {
            "id": "3",
            "name": "C/ NÀPOLS, 82",
          },
        },
        "errors": undefined,
        "extensions": undefined,
        "http": Object {
          "headers": Headers {
            Symbol(map): Object {
              "Cache-Control": Array [
                "max-age=3400, public",
              ],
            },
          },
        },
      }
    `);
  });
});
