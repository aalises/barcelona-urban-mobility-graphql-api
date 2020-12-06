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
      ... on BikeStation {
        id
        name
      }
      ... on NotFoundError {
        params
      }
    }
  }
`;

describe("bikeStation Query", () => {
  const { server, bike } = createTestServer();
  const { query } = createTestClient(server);

  it("Gets a given bike station", async () => {
    (bike as any).get = jest
      .fn()
      .mockReturnValueOnce(mockBikeStationsInfoAPIResponse)
      .mockReturnValueOnce(mockBikeStationsStatusAPIResponse);

    const res = await query({
      query: GET_BIKE_STATION,
      variables: { findBy: { id: 2 } },
    });

    expect(res?.data?.bikeStation?.id).toBe("2");
  });

  it("Returns a NotFoundError if the station was not found", async () => {
    (bike as any).get = jest
      .fn()
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null);

    const res = await query({
      query: GET_BIKE_STATION,
      variables: { findBy: { id: 32 } },
    });

    expect(res?.data?.bikeStation?.params?.id).toBe(32);
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
          [GraphQLError: You have to provide either a non empty ID, non empty Name or closest coordinates for the bikeStation query],
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
