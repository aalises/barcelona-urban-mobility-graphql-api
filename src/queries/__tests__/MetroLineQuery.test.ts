import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import {
  mockMetroLinesAPIResponse,
  mockMetroLinesResponse,
} from "../../datasources/__fixtures__/MetroLinesFixtures";

const GET_METRO_LINE = gql`
  query getMetroLines($findBy: FindByInput!) {
    metroLine(findBy: $findBy) {
      stations {
        edges {
          node {
            id
            name
          }
        }
      }
      id
      name
    }
  }
`;

describe("MetroStation Query", () => {
  const { server, metro } = createTestServer();
  const { query } = createTestClient(server);

  metro.get = jest.fn().mockReturnValue({
    ...mockMetroLinesAPIResponse,
    features: [mockMetroLinesAPIResponse.features[0]],
  });

  it("Gets a given metro line", async () => {
    metro.getLineStations = jest
      .fn()
      .mockReturnValueOnce(mockMetroLinesResponse[0].stations);

    const res = await query({
      query: GET_METRO_LINE,
      variables: { findBy: { id: 32 } },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "metroLine": Object {
            "id": 1,
            "name": "L1",
            "stations": Object {
              "edges": Array [
                Object {
                  "node": Object {
                    "id": "6660935",
                    "name": "Hospital de Bellvitge",
                  },
                },
                Object {
                  "node": Object {
                    "id": "6660525",
                    "name": "Fondo",
                  },
                },
              ],
            },
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

  it("Gets a metro line with no stations", async () => {
    metro.getLineStations = jest.fn().mockReturnValueOnce(undefined);

    const res = await query({
      query: GET_METRO_LINE,
      variables: { findBy: { id: 32 } },
    });

    expect(res?.data?.metroLine.stations).toBeNull();
  });

  it("Throws a validation error if the ID and name are falsy", async () => {
    const res = await query({
      query: GET_METRO_LINE,
      variables: { findBy: { id: null, name: null } },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "metroLine": null,
        },
        "errors": Array [
          [GraphQLError: You have to provide either a non empty ID or non empty Name for the metroLine query],
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
