import DataSource from "../BikeDataSource";
import {
  mockBikeStationsInfoAPIResponse,
  mockBikeStationsStatusAPIResponse,
  mockBikeStationsResponse,
} from "../__fixtures__/BikeStationsFixtures";
import { ApolloError, ValidationError } from "apollo-server-lambda";

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

  describe("[getStation]", () => {
    it("Throws a Validation Error if a falsy ID and name are passed as parameter", async () => {
      const res = await BikeDataSource.getStation({
        id: null,
        name: null,
      });

      expect(res).toBeInstanceOf(ValidationError);
    });

    it("Throws a Not Found Error if the response does not contain stations", async () => {
      mockGet.mockReturnValueOnce([]).mockReturnValueOnce([]);
      const res = await BikeDataSource.getStation({ id: 32 });

      expect(res).toBeInstanceOf(ApolloError);
    });

    it("Correctly gets a station by ID", async () => {
      mockGet
        .mockReturnValueOnce(mockBikeStationsInfoAPIResponse)
        .mockReturnValueOnce(mockBikeStationsStatusAPIResponse);

      const res = await BikeDataSource.getStation({ id: 1 });

      expect(res).toEqual(mockBikeStationsResponse[0]);
    });

    it("Correctly gets a station by Name", async () => {
      mockGet
        .mockReturnValueOnce(mockBikeStationsInfoAPIResponse)
        .mockReturnValueOnce(mockBikeStationsStatusAPIResponse);

      const res = await BikeDataSource.getStation({
        name: "C/ ROGER DE FLOR, 126",
      });

      expect(res).toEqual(mockBikeStationsResponse[1]);
    });
  });
});
