import DataSource from "../MetroStationsDataSource";
import { ApolloError, ValidationError } from "apollo-server-lambda";
import {
  mockMetroStationsAPIResponse,
  mockMetroStationsResponse,
} from "../__fixtures__/MetroStationsFixtures";

const MetroStationsDataSource = new DataSource();

describe("MetroStationsMetroStationsDataSource", () => {
  const mockGet = jest.fn();

  MetroStationsDataSource.get = mockGet;

  describe("[getAllStations]", () => {
    it("Correctly looks up the stations from the API", async () => {
      mockGet.mockReturnValueOnce(mockMetroStationsAPIResponse);

      const res = await MetroStationsDataSource.getAllStations();
      expect(res).toEqual(mockMetroStationsResponse);

      expect(mockGet.mock.calls[0][0]).toBe("estacions");
    });
  });

  describe("[getStation]", () => {
    it("Throws a Validation Error if a falsy ID and name are passed as parameter", async () => {
      const res = await MetroStationsDataSource.getStation({
        id: null,
        name: null,
      });

      expect(res).toBeInstanceOf(ValidationError);
    });

    it("Throws a Not Found Error if the response does not contain features", async () => {
      mockGet.mockReturnValueOnce({ features: [] });
      const res = await MetroStationsDataSource.getStation({ id: 32 });

      expect(res).toBeInstanceOf(ApolloError);
    });

    it("Throws an Error if the features are null or undefined", async () => {
      mockGet.mockReturnValueOnce({ features: null });
      const res = await MetroStationsDataSource.getStation({
        name: "Urwhatawave",
      });

      expect(res).toBeInstanceOf(ApolloError);
    });

    it("Correctly gets a station by ID", async () => {
      mockGet.mockReturnValueOnce({
        features: [mockMetroStationsAPIResponse.features[0]],
      });
      const res = await MetroStationsDataSource.getStation({ id: 32 });

      expect(res).toEqual(mockMetroStationsResponse.stations[0]);
      expect(mockGet.mock.calls[0][0]).toBe("estacions/32");
    });

    it("Correctly gets a station by Name", async () => {
      mockGet.mockReturnValueOnce({
        features: [mockMetroStationsAPIResponse.features[0]],
      });
      const res = await MetroStationsDataSource.getStation({
        name: "Urwhatawave",
      });

      expect(res).toEqual(mockMetroStationsResponse.stations[0]);
      expect(mockGet).toBeCalledWith("estacions", {
        filter: "NOM_ESTACIO='Urwhatawave'",
      });
    });
  });

  it("[metroStationReducer]: Correctly parses an station API data to the schema format", () => {
    expect(
      MetroStationsDataSource.metroStationReducer(
        mockMetroStationsAPIResponse.features[0] as any
      )
    ).toEqual(mockMetroStationsResponse.stations[0]);
  });

  test.each([
    ["L1", ["L1"]],
    ["", []],
    ["L1L2", ["L1", "L2"]],
    ["L4L5L10N", ["L4", "L5", "L10N"]],
  ])(
    "[parseLines]: Parses the line string %p to be %p",
    (lineString, parsedLineString) => {
      expect(MetroStationsDataSource.parseLines(lineString)).toEqual(
        parsedLineString
      );
    }
  );
});
