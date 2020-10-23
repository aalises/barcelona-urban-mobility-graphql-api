import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import { mockMetroStationsAPIResponse } from "../../datasources/__fixtures__/MetroStationsFixtures";

const GET_METRO_STATION = gql`
  query getMetroStations($findBy: FindByInput!) {
    metroStation(findBy: $findBy) {
      id
      name
    }
  }
`;

describe("MetroStation Query", () => {
  const { server, metroStations } = createTestServer();
  const { query } = createTestClient(server);

  metroStations.get = jest.fn().mockReturnValue({
    ...mockMetroStationsAPIResponse,
    features: [mockMetroStationsAPIResponse.features[0]],
  });

  it("Gets a given metro station", async () => {
    const res = await query({
      query: GET_METRO_STATION,
      variables: { findBy: { id: 32 } },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "metroStation": Object {
            "id": "6660935",
            "name": "La Salut",
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
  it("Throws a validation error if the ID and name are falsy", async () => {
    const res = await query({
      query: GET_METRO_STATION,
      variables: { findBy: { id: null, name: null } },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "metroStation": null,
        },
        "errors": Array [
          [GraphQLError: You have to provide either a non empty ID or non empty Name for the metroStation query],
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
