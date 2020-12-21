import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import { mockBusLinesAPIResponse } from "../../datasources/__fixtures__/BusLinesFixtures";

const GET_BUS_LINES = gql`
  query getBusLines($first: Int) {
    busLines(first: $first) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

describe("BusLines Query", () => {
  it("Fetches list of Bus lines", async () => {
    const { server, bus } = createTestServer();
    bus.get = jest.fn().mockReturnValueOnce(mockBusLinesAPIResponse);

    const { query } = createTestClient(server);
    const res = await query({
      query: GET_BUS_LINES,
      variables: { first: 2 },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "busLines": Object {
            "edges": Array [
              Object {
                "node": Object {
                  "id": 95,
                  "name": "Circular Cornellà 1",
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
