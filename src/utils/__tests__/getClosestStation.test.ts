import {
  getClosestBikeStation,
  getClosestTmbStation,
} from "../getClosestStation";

import { mockBikeStationsResponse } from "../../datasources/__fixtures__/BikeStationsFixtures";

import {
  mockMetroStationsAPIResponse,
  mockMetroStationsResponse,
} from "../../datasources/__fixtures__/MetroStationsFixtures";

const nullcoordinates = {
  latitude: null,
  longitude: null,
};

describe("getClosestStation", () => {
  describe("[getClosestBikeStation]", () => {
    test.each([
      [mockBikeStationsResponse[0].coordinates, mockBikeStationsResponse[0]],
      [mockBikeStationsResponse[1].coordinates, mockBikeStationsResponse[1]],
      [nullcoordinates, mockBikeStationsResponse[0]],
    ])("Gets the closest bike station", (coordinates, closestStation) => {
      expect(getClosestBikeStation(mockBikeStationsResponse, coordinates)).toBe(
        closestStation
      );
    });
  });
  describe("[getClosestTmbStation]", () => {
    test.each([
      [
        mockMetroStationsResponse[0].coordinates,
        mockMetroStationsAPIResponse.features[0],
      ],
      [
        mockMetroStationsResponse[1].coordinates,
        mockMetroStationsAPIResponse.features[1],
      ],
      [nullcoordinates, mockMetroStationsAPIResponse.features[0]],
    ])("Gets the closest metro station", (coordinates, closestStation) => {
      expect(
        getClosestTmbStation(mockMetroStationsAPIResponse.features, coordinates)
      ).toBe(closestStation);
    });
  });
});
