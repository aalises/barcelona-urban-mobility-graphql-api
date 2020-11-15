import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import {
  mockBikeStationsStatusAPIResponse,
  mockBikeStationsInfoAPIResponse,
} from "../../datasources/__fixtures__/BikeStationsFixtures";

const GET_BIKE_STATION = gql`
  query getBikeStation($findBy: FindByInput!) {
    bikeStation(findBy: $findBy) {
      id
      name
    }
  }
`;

describe("bikeStation Query", () => {
  const { server, bike } = createTestServer();
  const { query } = createTestClient(server);

  it("Gets a given metro station", async () => {
    (bike as any).get = jest
      .fn()
      .mockReturnValueOnce(mockBikeStationsInfoAPIResponse)
      .mockReturnValueOnce(mockBikeStationsStatusAPIResponse);

    const res = await query({
      query: GET_BIKE_STATION,
      variables: { findBy: { id: 2 } },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "bikeStation": Object {
            "id": "2",
            "name": "C/ ROGER DE FLOR, 126",
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
      query: GET_BIKE_STATION,
      variables: { findBy: { id: null, name: null } },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "bikeStation": null,
        },
        "errors": Array [
          [GraphQLError: You have to provide either a non empty ID or non empty Name for the bikeStation query],
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
