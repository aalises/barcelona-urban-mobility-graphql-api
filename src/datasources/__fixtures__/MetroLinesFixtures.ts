export const mockMetroLinesAPIResponse: any = {
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
  totalFeatures: 12,
  numberMatched: 1,
  numberReturned: 1,
  timeStamp: "2020-10-19T06:44:29.076Z",
  crs: {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:EPSG::4326",
    },
  },
};

export const mockMetroLinesResponse: any = {
  numberOfLines: 1,
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
