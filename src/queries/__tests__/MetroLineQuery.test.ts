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
      ... on MetroLine {
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
      ... on NotFoundError {
        params
      }
    }
  }
`;

describe("MetroStation Query", () => {
  const { server, metro } = createTestServer();
  const { query } = createTestClient(server);

  it("Gets a given metro line", async () => {
    metro.get = jest.fn().mockReturnValueOnce({
      ...mockMetroLinesAPIResponse,
      features: [mockMetroLinesAPIResponse.features[0]],
    });

    metro.getLineStations = jest
      .fn()
      .mockReturnValueOnce(mockMetroLinesResponse[0].stations);

    const res = await query({
      query: GET_METRO_LINE,
      variables: { findBy: { id: 32 } },
    });

    expect(res?.data?.metroLine?.id).toBe(1);
  });

  it("Returns a NotFoundError if the line was not found", async () => {
    metro.get = jest.fn().mockReturnValueOnce({ features: [] });

    const res = await query({
      query: GET_METRO_LINE,
      variables: { findBy: { id: 32 } },
    });

    expect(res?.data?.metroLine?.params?.id).toBe(32);
  });

  it("Gets a metro line with no stations", async () => {
    metro.get = jest.fn().mockReturnValueOnce({
      ...mockMetroLinesAPIResponse,
      features: [mockMetroLinesAPIResponse.features[0]],
    });
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
