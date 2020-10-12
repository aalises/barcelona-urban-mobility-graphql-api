import DataSource from "../MetroStationsDataSource";

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

describe("MetroStationsDataSource", () => {
  const dataSource = new DataSource();

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
