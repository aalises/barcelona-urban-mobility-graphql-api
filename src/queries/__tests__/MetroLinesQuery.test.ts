import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import { mockMetroLinesAPIResponse } from "../../datasources/__fixtures__/MetroLinesFixtures";

const GET_METRO_LINES = gql`
  query getMetroLines($first: Int) {
    metroLines(first: $first) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

describe("metroLines Query", () => {
  it("Fetches list of metro lines", async () => {
    const { server, metro } = createTestServer();
    metro.get = jest.fn().mockReturnValueOnce(mockMetroLinesAPIResponse);

    const { query } = createTestClient(server);
    const res = await query({
      query: GET_METRO_LINES,
      variables: { first: 2 },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "metroLines": Object {
            "edges": Array [
              Object {
                "node": Object {
                  "id": 1,
                  "name": "L1",
                },
              },
            ],
          },
        },
        "errors": undefined,
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
