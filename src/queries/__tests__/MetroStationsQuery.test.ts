import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import { mockMetroStationsAPIResponse } from "../../datasources/__fixtures__/MetroStationsFixtures";

const GET_METRO_STATIONS = gql`
  query getMetroStations($first: Int, $filterBy: FilterByInputMetro) {
    metroStations(first: $first, filterBy: $filterBy) {
      edges {
        node {
          lines
          name
        }
      }
    }
  }
`;

describe("metroStations Query", () => {
  const { server, metro } = createTestServer();
  const { query } = createTestClient(server);

  it("Fetches list of metro stations", async () => {
    metro.get = jest.fn().mockReturnValueOnce(mockMetroStationsAPIResponse);

    const res = await query({
      query: GET_METRO_STATIONS,
      variables: { first: 2 },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "metroStations": Object {
            "edges": Array [
              Object {
                "node": Object {
                  "lines": Array [
                    "L10N",
                  ],
                  "name": "La Salut",
                },
              },
              Object {
                "node": Object {
                  "lines": Array [
                    "L5",
                  ],
                  "name": "Camp de l'Arpa",
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
  it("Calls the getLineStations with the filtering params", async () => {
    const mockGetLineStations = jest.fn();

    metro.getLineStations = mockGetLineStations;

    await query({
      query: GET_METRO_STATIONS,
      variables: { first: 2, filterBy: { lineId: 3, lineName: "line name" } },
    });

    expect(mockGetLineStations).toHaveBeenCalledWith({
      id: 3,
      name: "line name",
    });
  });
});
