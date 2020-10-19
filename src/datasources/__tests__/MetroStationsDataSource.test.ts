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
    mockGet.mockReturnValueOnce(mockMetroStationsAPIResponse);

    const res = await dataSource.getAllStations();
    expect(res).toEqual(mockMetroStationsResponse);

    expect(mockGet).toBeCalledWith("estacions", {
      app_id: "testAppId",
      app_key: "testAppKey",
    });
  });

  it("Correctly parses an station API data to the schema format", () => {
    expect(
      dataSource.metroStationReducer(
        mockMetroStationsAPIResponse.features[0] as any
      )
    ).toEqual(mockMetroStationsResponse.stations[0]);
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

const mockMetroStationsAPIResponse = {
  type: "FeatureCollection",
  features: [
    {
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
        DATA: "2020-10-18Z",
      },
    },
    {
      type: "Feature",
      id: "ESTACIONS.6660525",
      geometry: {
        type: "Point",
        coordinates: [2.181497, 41.41506],
      },
      geometry_name: "GEOMETRY",
      properties: {
        CODI_GRUP_ESTACIO: 6660525,
        NOM_ESTACIO: "Camp de l'Arpa",
        PICTO: "L5",
        DATA: "2020-10-18Z",
      },
    },
  ],
  totalFeatures: 135,
  numberMatched: 2,
  numberReturned: 2,
  timeStamp: "2020-10-19T06:44:29.076Z",
  crs: {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:EPSG::4326",
    },
  },
};

const mockMetroStationsResponse = {
  numberOfStations: 2,
  stations: [
    {
      id: "ESTACIONS.6660935",
      lines: ["L10N"],
      location: {
        latitude: 41.442817,
        longitude: 2.224737,
      },
      name: "La Salut",
    },
    {
      id: "ESTACIONS.6660525",
      lines: ["L5"],
      location: {
        latitude: 41.41506,
        longitude: 2.181497,
      },
      name: "Camp de l'Arpa",
    },
  ],
};
