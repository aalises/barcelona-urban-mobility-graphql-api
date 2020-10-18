import DataSource from "../MetroStationsDataSource";

jest.mock("../../environment", () => ({
  TMB_API_APP_ID: "testAppId",
  TMB_API_APP_KEY: "testAppKey",
}));

const dataSource = new DataSource();
const mockGet = jest.fn();

//@ts-expect-error we are trying to mock a protected method, which is fine for our test purposes
dataSource.get = mockGet;

describe("MetroStationsDataSource", () => {
  it("Correctly looks up the stations from the API", async () => {
    await dataSource.getAllStations();

    expect(mockGet).toBeCalledWith("estacions", {
      app_id: "testAppId",
      app_key: "testAppKey",
    });
  });

  it("Correctly parses an station API data to the schema format", () => {
    expect(dataSource.metroStationReducer(data as any)).toEqual({
      id: "ESTACIONS.6660935",
      lines: ["L10N"],
      location: {
        latitude: 41.442817,
        longitude: 2.224737,
      },
      name: "La Salut",
    });
  });

  test.each([
    ["L1", ["L1"]],
    ["", []],
    ["L1L2", ["L1", "L2"]],
    ["L4L5L10N", ["L4", "L5", "L10N"]],
  ])("parses the line string %p to be %p", (lineString, parsedLineString) => {
    expect(dataSource.parseLines(lineString)).toEqual(parsedLineString);
  });
});

const data = {
  type: "Feature",
  id: "ESTACIONS.6660935",
  geometry: {
    type: "Point",
    coordinates: [2.224737, 41.442817],
  },
  geometry_name: "GEOMETRY",
  properties: {
    CODI_GRUP_ESTACIO: 6660935,
    NOM_ESTACIO: "La Salut",
    PICTO: "L10N",
    DATA: "2020-10-11Z",
  },
};
