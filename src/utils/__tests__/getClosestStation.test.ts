import {
  getClosestBikeStation,
  getClosestMetroStation,
} from "../getClosestStation";

import { mockBikeStationsResponse } from "../../datasources/__fixtures__/BikeStationsFixtures";

import {
  mockMetroStationsAPIResponse,
  mockMetroStationsResponse,
} from "../../datasources/__fixtures__/MetroStationsFixtures";

const nullLocation = {
  latitude: null,
  longitude: null,
};

describe("getClosestStation", () => {
  describe("[getClosestBikeStation]", () => {
    test.each([
      [mockBikeStationsResponse[0].location, mockBikeStationsResponse[0]],
      [mockBikeStationsResponse[1].location, mockBikeStationsResponse[1]],
      [nullLocation, mockBikeStationsResponse[0]],
    ])("Gets the closest bike station", (location, closestStation) => {
      expect(getClosestBikeStation(mockBikeStationsResponse, location)).toBe(
        closestStation
      );
    });
  });
  describe("[getClosestMetroStation]", () => {
    test.each([
      [
        mockMetroStationsResponse.stations[0].location,
        mockMetroStationsAPIResponse.features[0],
      ],
      [
        mockMetroStationsResponse.stations[1].location,
        mockMetroStationsAPIResponse.features[1],
      ],
      [nullLocation, mockMetroStationsAPIResponse.features[0]],
    ])("Gets the closest metro station", (location, closestStation) => {
      expect(
        getClosestMetroStation(mockMetroStationsAPIResponse.features, location)
      ).toBe(closestStation);
    });
  });
});
