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

  it("[bikeStationReducer]: Parses a bike station information and status API data to the schema format", () => {
    expect(
      BikeDataSource.bikeStationReducer(
        mockBikeStationsInfoAPIResponse.data.stations[0],
        mockBikeStationsStatusAPIResponse.data.stations[0]
      )
    ).toStrictEqual(mockBikeStationsResponse[0]);
  });

  describe("[getAllStations]", () => {
    it("Looks up the bike stations from the API", async () => {
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
    it("Throws a Not Found Error if the response does not contain stations", async () => {
      mockGet.mockReturnValueOnce([]).mockReturnValueOnce([]);
      const res = await BikeDataSource.getStation({
        id: 32,
        name: null,
        closest: null,
      });

      expect(res).toEqual({
        params: {
          id: 32,
          name: null,
          closest: null,
        },
      });
    });

    it("Gets a station by id", async () => {
      mockGet
        .mockReturnValueOnce(mockBikeStationsInfoAPIResponse)
        .mockReturnValueOnce(mockBikeStationsStatusAPIResponse);

      const res = await BikeDataSource.getStation({
        id: 1,
        name: null,
        closest: null,
      });

      expect(res).toEqual(mockBikeStationsResponse[0]);
    });

    it("Gets a station by name", async () => {
      mockGet
        .mockReturnValueOnce(mockBikeStationsInfoAPIResponse)
        .mockReturnValueOnce(mockBikeStationsStatusAPIResponse);

      const res = await BikeDataSource.getStation({
        id: null,
        closest: null,
        name: "C/ ROGER DE FLOR, 126",
      });

      expect(res).toEqual(mockBikeStationsResponse[1]);
    });

    it("Gets a station by proximity", async () => {
      mockGet
        .mockReturnValueOnce(mockBikeStationsInfoAPIResponse)
        .mockReturnValueOnce(mockBikeStationsStatusAPIResponse);

      const res = await BikeDataSource.getStation({
        id: null,
        name: null,
        closest: mockBikeStationsResponse[2].coordinates,
      });

      expect(res).toEqual(mockBikeStationsResponse[2]);
    });
  });
});
