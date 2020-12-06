export const mockMetroStationsAPIResponse: any = {
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

export const mockMetroStationsResponse: any = [
  {
    id: 6660935,
    lines: ["L10N"],
    location: {
      altitude: null,
      latitude: 41.442817,
      longitude: 2.224737,
    },
    name: "La Salut",
  },
  {
    id: 6660525,
    lines: ["L5"],
    location: {
      altitude: null,
      latitude: 41.41506,
      longitude: 2.181497,
    },
    name: "Camp de l'Arpa",
  },
];
