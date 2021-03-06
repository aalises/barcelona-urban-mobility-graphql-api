import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import {
  mockBikeStationsStatusAPIResponse,
  mockBikeStationsInfoAPIResponse,
  mockBikeStationsResponse,
} from "../../datasources/__fixtures__/BikeStationsFixtures";

const GET_BIKE_STATIONS = gql`
  query getBikeStations($filterBy: FilterByInputBike) {
    bikeStations(filterBy: $filterBy) {
      edges {
        node {
          lastUpdated
          available {
            bikes {
              total
              electrical
            }
          }
          status
        }
      }
    }
  }
`;

describe("bikeStations Query", () => {
  const { server, bike } = createTestServer();
  const { query } = createTestClient(server);

  (bike as any).get = jest
    .fn()
    .mockReturnValue(mockBikeStationsInfoAPIResponse)
    .mockReturnValue(mockBikeStationsStatusAPIResponse);

  it("Fetches all bike stations", async () => {
    const res = await query({
      query: GET_BIKE_STATIONS,
    });

    expect(res?.data?.bikeStations.edges).toHaveLength(
      mockBikeStationsResponse.length
    );
  });

  it("Fetches list of bike stations with available bikes", async () => {
    const res = await query({
      query: GET_BIKE_STATIONS,
      variables: { filterBy: { only: { hasAvailableBikes: true } } },
    });

    //There is no station returned that has no bikes
    const returnedStationWithNoBikes =
      res?.data?.bikeStations.edges.find(
        ({ node }) => node.available.bikes.total === 0
      ) ?? null;

    expect(returnedStationWithNoBikes).toBeNull();
  });

  it("Fetches list of bike stations with available electrical bikes", async () => {
    const res = await query({
      query: GET_BIKE_STATIONS,
      variables: { filterBy: { only: { hasAvailableElectricalBikes: true } } },
    });

    //There is no station returned that has no electrical bikes
    const returnedStationWithNoElectricalBikes =
      res?.data?.bikeStations.edges.find(
        ({ node }) => node.available.bikes.electrical === 0
      ) ?? null;

    expect(returnedStationWithNoElectricalBikes).toBeNull();
  });

  it("Fetches list of bike stations with available docks", async () => {
    const res = await query({
      query: GET_BIKE_STATIONS,
      variables: { filterBy: { only: { hasAvailableDocks: true } } },
    });

    //There is no station returned that has no docks
    const returnedStationWithNoDocks =
      res?.data?.bikeStations.edges.find(
        ({ node }) => node.available.docs === 0
      ) ?? null;

    expect(returnedStationWithNoDocks).toBeNull();
  });
  it("Fetches list of bike stations that are in service ", async () => {
    const res = await query({
      query: GET_BIKE_STATIONS,
      variables: { filterBy: { only: { isInService: true } } },
    });

    //There is no station returned that is not in service
    const returnedStationNotInService =
      res?.data?.bikeStations.edges.find(
        ({ node }) => node.status !== "IN_SERVICE"
      ) ?? null;

    expect(returnedStationNotInService).toBeNull();
  });
});
