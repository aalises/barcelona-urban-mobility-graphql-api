import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import { mockMetroStationsAPIResponse } from "../../datasources/__fixtures__/MetroStationsFixtures";

const GET_METRO_STATION = gql`
  query getMetroStations($findBy: FindByInput!) {
    metroStation(findBy: $findBy) {
      ... on MetroStation {
        id
        name
      }
      ... on NotFoundError {
        params
      }
    }
  }
`;

describe("MetroStation Query", () => {
  const { server, metro } = createTestServer();
  const { query } = createTestClient(server);

  it("Gets a given metro station", async () => {
    metro.get = jest.fn().mockReturnValueOnce({
      ...mockMetroStationsAPIResponse,
      features: [mockMetroStationsAPIResponse.features[0]],
    });

    const res = await query({
      query: GET_METRO_STATION,
      variables: { findBy: { id: 32 } },
    });

    expect(res?.data?.metroStation?.name).toEqual("La Salut");
  });

  it("Returns a NotFoundError if there were no stations found", async () => {
    metro.get = jest.fn().mockReturnValueOnce({ features: [] });

    const res = await query({
      query: GET_METRO_STATION,
      variables: { findBy: { id: 32 } },
    });

    expect(res?.data?.metroStation?.params?.id).toBe(32);
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
          [GraphQLError: You have to provide either a non empty ID , non empty Name or closest coordinates for the metroStation query],
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
