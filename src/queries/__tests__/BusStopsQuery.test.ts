import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import {
  mockBusStopsAPIResponse,
  mockBusStopsResponse,
} from "../../datasources/__fixtures__/BusStopsFixtures";

const GET_BUS_STOPS = gql`
  query getBusStops($first: Int, $filterBy: FilterByInputBus) {
    busStops(first: $first, filterBy: $filterBy) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

describe("busStops Query", () => {
  const { server, bus } = createTestServer();
  const { query } = createTestClient(server);

  it("Fetches list of bus stops", async () => {
    bus.get = jest.fn().mockReturnValueOnce(mockBusStopsAPIResponse);

    const res = await query({
      query: GET_BUS_STOPS,
      variables: { first: 2 },
    });

    expect(res?.data?.busStops?.edges.length).toBe(2);
    expect(res?.data?.busStops?.edges[0]?.node?.id).toBe(
      mockBusStopsResponse[0].id
    );
  });

  it("Calls the getLineStops with the filtering params", async () => {
    const mockGetLineStops = jest.fn();
    bus.getLineStops = mockGetLineStops;

    await query({
      query: GET_BUS_STOPS,
      variables: { first: 2, filterBy: { lineId: 3 } },
    });

    expect(mockGetLineStops).toHaveBeenCalledWith({
      id: 3,
    });
  });
});
