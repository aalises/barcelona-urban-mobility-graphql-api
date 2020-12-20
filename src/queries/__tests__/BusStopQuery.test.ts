import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import { mockBusStopsAPIResponse } from "../../datasources/__fixtures__/BusStopsFixtures";

const GET_BUS_STOP = gql`
  query getBusStop($findBy: FindByInput!) {
    busStop(findBy: $findBy) {
      ... on BusStop {
        id
        name
      }
      ... on NotFoundError {
        params
      }
    }
  }
`;

describe("BusStop Query", () => {
  const { server, bus } = createTestServer();
  const { query } = createTestClient(server);

  it("Gets a given Bus Stop", async () => {
    bus.get = jest.fn().mockReturnValueOnce({
      ...mockBusStopsAPIResponse,
      features: [mockBusStopsAPIResponse.features[0]],
    });

    const res = await query({
      query: GET_BUS_STOP,
      variables: { findBy: { id: 32 } },
    });

    expect(res?.data?.busStop?.name).toEqual(
      "Av Riera de Sant Cugat - Ptge de la Pintura"
    );
  });

  it("Returns a NotFoundError if there were no stops found", async () => {
    bus.get = jest.fn().mockReturnValueOnce({ features: [] });

    const res = await query({
      query: GET_BUS_STOP,
      variables: { findBy: { id: 32 } },
    });

    expect(res?.data?.busStop?.params?.id).toBe(32);
  });

  it("Throws a validation error if the ID and name are falsy", async () => {
    const res = await query({
      query: GET_BUS_STOP,
      variables: { findBy: { id: null, name: null } },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "busStop": null,
        },
        "errors": Array [
          [GraphQLError: You have to provide either a non empty ID , non empty Name or closest coordinates for the busStop query],
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
