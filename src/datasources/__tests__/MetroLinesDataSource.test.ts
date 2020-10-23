import DataSource from "../MetroLinesDataSource";
import { ApolloError, ValidationError } from "apollo-server-lambda";
import {
  mockMetroLinesAPIResponse,
  mockMetroLinesResponse,
} from "../__fixtures__/MetroLinesFixtures";

const MetroLinesDataSource = new DataSource();

describe("MetroLinesDataSource", () => {
  const mockGet = jest.fn();

  MetroLinesDataSource.get = mockGet;
  MetroLinesDataSource.getLineStations = jest
    .fn()
    .mockReturnValue(mockMetroLinesResponse.lines[0].stations);

  describe("[getLine]", () => {
    it("Throws a Validation Error if a falsy ID and name are passed as parameter", async () => {
      const res = await MetroLinesDataSource.getLine({
        id: null,
        name: null,
      });

      expect(res).toBeInstanceOf(ValidationError);
    });

    it("Throws a Not Found Error if the response does not contain features", async () => {
      mockGet.mockReturnValueOnce({ features: [] });
      const res = await MetroLinesDataSource.getLine({ id: 32 });

      expect(res).toBeInstanceOf(ApolloError);
    });

    it("Throws an Error if the features are null or undefined", async () => {
      mockGet.mockReturnValueOnce({ features: null });
      const res = await MetroLinesDataSource.getLine({
        name: "L4",
      });

      expect(res).toBeInstanceOf(ApolloError);
    });

    it("Correctly gets a line by ID", async () => {
      mockGet.mockReturnValueOnce({
        features: [mockMetroLinesAPIResponse.features[0]],
      });
      const res = await MetroLinesDataSource.getLine({ id: 32 });

      expect(res).toEqual(mockMetroLinesResponse.lines[0]);
      expect(mockGet.mock.calls[0][0]).toBe("linies/metro/32");
    });

    it("Correctly gets a line by Name", async () => {
      mockGet.mockReturnValueOnce({
        features: [mockMetroLinesAPIResponse.features[0]],
      });
      const res = await MetroLinesDataSource.getLine({
        name: "L4",
      });

      expect(res).toEqual(mockMetroLinesResponse.lines[0]);
      expect(mockGet).toBeCalledWith("linies/metro", {
        filter: "NOM_LINIA='L4'",
      });
    });
  });

  it("[metroLineReducer]: Correctly parses a metro line API data to the schema format", () => {
    const lineResponse = mockMetroLinesResponse.lines[0];
    expect(
      MetroLinesDataSource.metroLineReducer(
        mockMetroLinesAPIResponse.features[0] as any
      )
    ).toEqual({
      ...lineResponse,
      endingStation: lineResponse.endingStation.name,
      originStation: lineResponse.originStation.name,
      stations: null,
    });
  });
});
