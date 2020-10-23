import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import {
  mockMetroLinesAPIResponse,
  mockMetroLinesResponse,
} from "../../datasources/__tests__/MetroLinesDataSource.test";

const GET_METRO_LINE = gql`
  query getMetroLines($findBy: FindByInput!) {
    metroLine(findBy: $findBy) {
      id
      name
    }
  }
`;

describe("MetroStation Query", () => {
  const { server, metroLines } = createTestServer();
  const { query } = createTestClient(server);

  metroLines.getLineStations = jest
    .fn()
    .mockReturnValue(mockMetroLinesResponse.lines[0].stations);

  metroLines.get = jest.fn().mockReturnValue({
    ...mockMetroLinesAPIResponse,
    features: [mockMetroLinesAPIResponse.features[0]],
  });

  it("Gets a given metro line", async () => {
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
