export const mockBusLinesAPIResponse: any = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "LINIES_BUS.fid--395036be_1768582c879_-7356",
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
        ID_LINIA: 2872,
        CODI_LINIA: 95,
        NOM_LINIA: "95",
        DESC_LINIA: "Circular Cornellà 1",
        ORIGEN_LINIA: "Barri Almeda",
        DESTI_LINIA: "Pl. Fontsanta",
        NUM_PAQUETS: 1,
        ID_OPERADOR: 2,
        CODI_OPERADOR: "002",
        NOM_OPERADOR: "TB",
        ID_TIPUS_TRANSPORT: 3,
        NOM_TIPUS_TRANSPORT: "BUS",
        ID_FAMILIA: 5,
        CODI_FAMILIA: 3,
        NOM_FAMILIA: "Proximitat",
        ORDRE_FAMILIA: 13,
        ORDRE_LINIA: 95,
        CODI_TIPUS_CALENDARI: "1",
        NOM_TIPUS_CALENDARI: "Tots els dies",
        DATA: "2020-12-20Z",
        COLOR_LINIA: "DC241F",
        COLOR_AUX_LINIA: "ED8E8C",
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

export const mockBusLinesResponse: any = [
  {
    id: 95,
    name: "Circular Cornellà 1",
    color: "DC241F",
    endingStop: {
      id: "985",
      location: {
        address: "Riera Sant Cugat, 38",
        city: "Montcada i Reixac",
        coordinates: {
          altitude: null,
          latitude: 41.48451,
          longitude: 2.178948,
        },
        district: null,
        street: "Avinguda Riera de Sant Cugat",
      },
      name: "Pl. Fontsanta",
    },
    originStop: {
      id: "1718",
      location: {
        address: "Riera Sant Cugat, 11-13",
        city: "Montcada i Reixac",
        coordinates: {
          altitude: null,
          latitude: 41.485729,
          longitude: 2.181499,
        },
        district: null,
        street: "Avinguda Riera de Sant Cugat",
      },
      name: "Barri Almeda",
    },
    stops: [
      {
        id: "1718",
        location: {
          address: "Riera Sant Cugat, 11-13",
          city: "Montcada i Reixac",
          coordinates: {
            altitude: null,
            latitude: 41.485729,
            longitude: 2.181499,
          },
          district: null,
          street: "Avinguda Riera de Sant Cugat",
        },
        name: "Barri Almeda",
      },
      {
        id: "985",
        location: {
          address: "Riera Sant Cugat, 38",
          city: "Montcada i Reixac",
          coordinates: {
            altitude: null,
            latitude: 41.48451,
            longitude: 2.178948,
          },
          district: null,
          street: "Avinguda Riera de Sant Cugat",
        },
        name: "Pl. Fontsanta",
      },
    ],
  },
];
