import DataSource from "../BusDataSource";
import {
  mockBusStopsAPIResponse,
  mockBusStopsResponse,
} from "../__fixtures__/BusStopsFixtures";

const BusDataSource = new DataSource();

describe("BusDataSource", () => {
  const mockGet = jest.fn();

  BusDataSource.get = mockGet;

  it("[busStopReducer]: Parses a bus stop API data to the schema format", () => {
    expect(
      BusDataSource.busStopReducer(mockBusStopsAPIResponse.features[0])
    ).toEqual(mockBusStopsResponse[0]);
  });

  describe("[getStop]", () => {
    it("Returns a Not Found Error if the response does not contain features", async () => {
      mockGet.mockReturnValueOnce({ features: [] });
      const res = await BusDataSource.getStop({
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

    it("Returns an Not Found Error if the features are null or undefined", async () => {
      mockGet.mockReturnValueOnce({ features: null });
      const res = await BusDataSource.getStop({
        closest: null,
        id: null,
        name: "Urwhatawave",
      });

      expect(res).toEqual({
        params: { name: "Urwhatawave", closest: null, id: null },
      });
    });

    it("Gets a stop by ID", async () => {
      mockGet.mockReturnValueOnce({
        features: [mockBusStopsAPIResponse.features[0]],
      });
      const res = await BusDataSource.getStop({
        id: 32,
        name: null,
        closest: null,
      });

      expect(res).toEqual(mockBusStopsResponse[0]);
      expect(mockGet.mock.calls[0][0]).toBe("parades/32");
    });

    it("Gets a stop by Name", async () => {
      mockGet.mockReturnValueOnce({
        features: [mockBusStopsAPIResponse.features[0]],
      });
      const res = await BusDataSource.getStop({
        id: null,
        closest: null,
        name: "Urwhatawave",
      });

      expect(res).toEqual(mockBusStopsResponse[0]);
      expect(mockGet).toBeCalledWith("parades", {
        filter: "NOM_PARADA='Urwhatawave'",
      });
    });

    it("Gets a stop by proximity", async () => {
      mockGet.mockReturnValueOnce(mockBusStopsAPIResponse);
      const res = await BusDataSource.getStop({
        name: null,
        id: null,
        closest: mockBusStopsResponse[1].location.coordinates,
      });

      expect(res).toEqual(mockBusStopsResponse[1]);
      expect(mockGet).toBeCalledWith("parades", {});
    });
  });
});
