import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import {
  mockBusLinesAPIResponse,
  mockBusLinesResponse,
} from "../../datasources/__fixtures__/BusLinesFixtures";

const GET_BUS_LINE = gql`
  query getBusLines($findBy: FindByInput!) {
    busLine(findBy: $findBy) {
      ... on BusLine {
        stops {
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

describe("busStop Query", () => {
  const { server, bus } = createTestServer();
  const { query } = createTestClient(server);

  it("Gets a given bus line", async () => {
    bus.get = jest.fn().mockReturnValueOnce({
      ...mockBusLinesAPIResponse,
      features: [mockBusLinesAPIResponse.features[0]],
    });

    bus.getLineStops = jest
      .fn()
      .mockReturnValueOnce(mockBusLinesResponse[0].stops);

    const res = await query({
      query: GET_BUS_LINE,
      variables: { findBy: { id: 95 } },
    });

    expect(res?.data?.busLine?.id).toBe(95);
  });

  it("Returns a NotFoundError if the line was not found", async () => {
    bus.get = jest.fn().mockReturnValueOnce({ features: [] });

    const res = await query({
      query: GET_BUS_LINE,
      variables: { findBy: { id: 95 } },
    });

    expect(res?.data?.busLine?.params?.id).toBe(95);
  });

  it("Gets a bus line with no stops", async () => {
    bus.get = jest.fn().mockReturnValueOnce({
      ...mockBusLinesAPIResponse,
      features: [mockBusLinesAPIResponse.features[0]],
    });
    bus.getLineStops = jest.fn().mockReturnValueOnce(undefined);

    const res = await query({
      query: GET_BUS_LINE,
      variables: { findBy: { id: 32 } },
    });

    expect(res?.data?.busLine.stops).toBeNull();
  });

  it("Throws a validation error if the ID and name are falsy", async () => {
    const res = await query({
      query: GET_BUS_LINE,
      variables: { findBy: { id: null, name: null } },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "busLine": null,
        },
        "errors": Array [
          [GraphQLError: You have to provide either a non empty ID or non empty Name for the busLine query],
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
