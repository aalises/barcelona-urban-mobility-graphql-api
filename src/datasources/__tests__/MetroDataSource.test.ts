import DataSource from "../MetroDataSource";
import { ApolloError } from "apollo-server-lambda";
import {
  mockMetroStationsAPIResponse,
  mockMetroStationsResponse,
} from "../__fixtures__/MetroStationsFixtures";
import {
  mockMetroLinesAPIResponse,
  mockMetroLinesResponse,
} from "../__fixtures__/MetroLinesFixtures";

const MetroDataSource = new DataSource();

describe("MetroDataSource", () => {
  const mockGet = jest.fn();

  MetroDataSource.get = mockGet;
  MetroDataSource.getLineStations = jest.fn().mockReturnValue({
    numberOfStations: 5,
    stations: mockMetroLinesResponse.lines[0].stations,
  });

  describe("[getAllLines]", () => {
    it("Looks up the lines from the API", async () => {
      mockGet.mockReturnValueOnce(mockMetroLinesAPIResponse);

      const res = await MetroDataSource.getAllLines();
      expect(res).toEqual(mockMetroLinesResponse);

      expect(mockGet.mock.calls[0][0]).toBe("linies/metro");
    });
  });
  describe("[getLine]", () => {
    it("Throws a Not Found Error if the response does not contain features", async () => {
      mockGet.mockReturnValueOnce({ features: [] });
      const res = await MetroDataSource.getLine({ id: 32 });

      expect(res).toBeInstanceOf(ApolloError);
    });

    it("Throws an Error if the features are null or undefined", async () => {
      mockGet.mockReturnValueOnce({ features: null });
      const res = await MetroDataSource.getLine({
        name: "L4",
      });

      expect(res).toBeInstanceOf(ApolloError);
    });

    it("Gets a line by ID", async () => {
      mockGet.mockReturnValueOnce({
        features: [mockMetroLinesAPIResponse.features[0]],
      });
      const res = await MetroDataSource.getLine({ id: 32 });

      expect(res).toEqual(mockMetroLinesResponse.lines[0]);
      expect(mockGet.mock.calls[0][0]).toBe("linies/metro/32");
    });

    it("Gets a line by Name", async () => {
      mockGet.mockReturnValueOnce({
        features: [mockMetroLinesAPIResponse.features[0]],
      });
      const res = await MetroDataSource.getLine({
        name: "L4",
      });

      expect(res).toEqual(mockMetroLinesResponse.lines[0]);
      expect(mockGet).toBeCalledWith("linies/metro", {
        filter: "NOM_LINIA='L4'",
      });
    });
  });

  it("[metroLineReducer]: Parses a metro line API data to the schema format", () => {
    const lineResponse = mockMetroLinesResponse.lines[0];
    expect(
      MetroDataSource.metroLineReducer(mockMetroLinesAPIResponse.features[0])
    ).toEqual({
      ...lineResponse,
      endingStation: lineResponse.endingStation.name,
      originStation: lineResponse.originStation.name,
      stations: null,
    });
  });

  describe("[getAllStations]", () => {
    it("Looks up the stations from the API", async () => {
      mockGet.mockReturnValueOnce(mockMetroStationsAPIResponse);

      const res = await MetroDataSource.getAllStations();
      expect(res).toEqual(mockMetroStationsResponse);

      expect(mockGet.mock.calls[0][0]).toBe("estacions");
    });
  });

  describe("[getStation]", () => {
    it("Throws a Not Found Error if the response does not contain features", async () => {
      mockGet.mockReturnValueOnce({ features: [] });
      const res = await MetroDataSource.getStation({ id: 32 });

      expect(res).toBeInstanceOf(ApolloError);
    });

    it("Throws an Error if the features are null or undefined", async () => {
      mockGet.mockReturnValueOnce({ features: null });
      const res = await MetroDataSource.getStation({
        name: "Urwhatawave",
      });

      expect(res).toBeInstanceOf(ApolloError);
    });

    it("Gets a station by ID", async () => {
      mockGet.mockReturnValueOnce({
        features: [mockMetroStationsAPIResponse.features[0]],
      });
      const res = await MetroDataSource.getStation({ id: 32 });

      expect(res).toEqual(mockMetroStationsResponse.stations[0]);
      expect(mockGet.mock.calls[0][0]).toBe("estacions/32");
    });

    it("Gets a station by Name", async () => {
      mockGet.mockReturnValueOnce({
        features: [mockMetroStationsAPIResponse.features[0]],
      });
      const res = await MetroDataSource.getStation({
        name: "Urwhatawave",
      });

      expect(res).toEqual(mockMetroStationsResponse.stations[0]);
      expect(mockGet).toBeCalledWith("estacions", {
        filter: "NOM_ESTACIO='Urwhatawave'",
      });
    });

    it("Gets a station by proximity", async () => {
      mockGet.mockReturnValueOnce(mockMetroStationsAPIResponse);
      const res = await MetroDataSource.getStation({
        closest: mockMetroStationsResponse.stations[1].location,
      });

      expect(res).toEqual(mockMetroStationsResponse.stations[1]);
      expect(mockGet).toBeCalledWith("estacions", {});
    });
  });

  it("[metroStationReducer]: Parses an station API data to the schema format", () => {
    expect(
      MetroDataSource.metroStationReducer(
        mockMetroStationsAPIResponse.features[0]
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
      expect(MetroDataSource.parseLines(lineString)).toEqual(parsedLineString);
    }
  );
});
