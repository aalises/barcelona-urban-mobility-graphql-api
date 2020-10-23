import DataSource from "../MetroLinesDataSource";
import { ApolloError, ValidationError } from "apollo-server-lambda";

export const mockMetroLinesAPIResponse = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "LINIES_METRO.fid-1c65e68b_17554e42aba_-71",
      geometry: {
        type: "MultiLineString",
        coordinates: [
          [
            [2.098464, 41.342133],
            [2.10047, 41.34162],
          ],
        ],
      },
      geometry_name: "GEOMETRY",
      properties: {
        ID_LINIA: 4,
        CODI_LINIA: 1,
        NOM_LINIA: "L1",
        DESC_LINIA: "Hospital de Bellvitge - Fondo",
        ORIGEN_LINIA: "Hospital de Bellvitge",
        DESTI_LINIA: "Fondo",
        NUM_PAQUETS: 1,
        ID_OPERADOR: 1,
        NOM_OPERADOR: "Metro",
        NOM_TIPUS_TRANSPORT: "METRO",
        CODI_FAMILIA: 1,
        NOM_FAMILIA: "Metro",
        ORDRE_FAMILIA: 1,
        ORDRE_LINIA: 1,
        CODI_TIPUS_CALENDARI: "1",
        NOM_TIPUS_CALENDARI: "Tots els dies",
        DATA: "2020-10-22Z",
        COLOR_LINIA: "CE1126",
        COLOR_AUX_LINIA: "CE1126",
        COLOR_TEXT_LINIA: "FFFFFF",
      },
    },
  ],
};

export const mockMetroLinesResponse = {
  lines: [
    {
      id: 1,
      name: "L1",
      originStation: {
        id: 6660935,
        lines: ["L1"],
        location: {
          latitude: 41.442817,
          longitude: 2.224737,
        },
        name: "Hospital de Bellvitge",
      },
      endingStation: {
        id: 6660525,
        lines: ["L1"],
        location: {
          latitude: 41.41506,
          longitude: 2.181497,
        },
        name: "Fondo",
      },
      stations: [
        {
          id: 6660935,
          lines: ["L1"],
          location: {
            latitude: 41.442817,
            longitude: 2.224737,
          },
          name: "Hospital de Bellvitge",
        },
        {
          id: 6660525,
          lines: ["L1"],
          location: {
            latitude: 41.41506,
            longitude: 2.181497,
          },
          name: "Fondo",
        },
      ],
      color: "CE1126",
    },
  ],
};

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
