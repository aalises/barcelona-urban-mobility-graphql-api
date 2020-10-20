import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import { mockMetroStationsAPIResponse } from "../../datasources/__tests__/MetroStationsDataSource.test";

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

  //@ts-expect-error we are trying to mock a protected method, which is fine for our test purposes
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
  it("Throws a validation error if the ID is null", async () => {
    const res = await query({
      query: GET_METRO_STATION,
      variables: { findBy: { id: null } },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "metroStation": null,
        },
        "errors": Array [
          [GraphQLError: You have to provide a non empty ID for the metroStation query],
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