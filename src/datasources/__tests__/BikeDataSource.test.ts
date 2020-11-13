import DataSource from "../BikeDataSource";
import {
  mockBikeStationsInfoAPIResponse,
  mockBikeStationsStatusAPIResponse,
  mockBikeStationsResponse,
} from "../__fixtures__/BikeStationsFixtures";

const BikeDataSource = new DataSource();

describe("BikeDataSource", () => {
  const mockGet = jest.fn();

  (BikeDataSource as any).get = mockGet;

  it("[bikeStationReducer]: Correctly parses a bike station information and status API data to the schema format", () => {
    expect(
      BikeDataSource.bikeStationReducer(
        mockBikeStationsInfoAPIResponse.data.stations[0],
        mockBikeStationsStatusAPIResponse.data.stations[0]
      )
    ).toStrictEqual(mockBikeStationsResponse[0]);
  });

  describe("[getAllStations]", () => {
    it("Correctly looks up the bike stations from the API", async () => {
      mockGet
        .mockReturnValueOnce(mockBikeStationsInfoAPIResponse)
        .mockReturnValueOnce(mockBikeStationsStatusAPIResponse);

      const res = await BikeDataSource.getAllStations();
      expect(res).toStrictEqual(mockBikeStationsResponse);

      expect(mockGet.mock.calls[0][0]).toBe("station_information");
      expect(mockGet.mock.calls[1][0]).toBe("station_status");
    });
  });
});
