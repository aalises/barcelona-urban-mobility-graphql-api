import TmbApiDataSource from "./TmbApiDataSource";
import type {
  FindByInput,
  MetroStation as MetroStationType,
  MetroLine as MetroLineType,
  CoordinatesInput as CoordinatesType,
} from "../../types";
import { ApolloError } from "apollo-server-lambda";
import { getClosestMetroStation } from "../utils/getClosestStation";

export interface MetroLineAPIType {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: number[][];
  };
  geometry_name: string;
  properties: {
    ID_LINIA: number;
    CODI_LINIA: number;
    NOM_LINIA: string;
    DESC_LINIA: string;
    ORIGEN_LINIA: string;
    DESTI_LINIA: string;
    NUM_PAQUETS: number;
    ID_OPERADOR: number;
    NOM_OPERADOR: string;
    NOM_TIPUS_TRANSPORT: string;
    CODI_FAMILIA: number;
    NOM_FAMILIA: string;
    ORDRE_FAMILIA: string;
    ORDRE_LINIA: number;
    CODI_TIPUS_CALENDARI: string;
    NOM_TIPUS_CALENDARI: string;
    DATA: string;
    COLOR_LINIA: string;
    COLOR_AUX_LINIA: string;
    COLOR_TEXT_LINIA: string;
  };
}

interface MetroLinesAPIType {
  type: "FeatureCollection";
  features: ReadonlyArray<MetroLineAPIType>;
  totalFeatures: number;
  numberMatched: number;
  numberReturned: number;
  timeStamp: string;
  crs: {
    type: "name";
    properties: {
      name: string;
    };
  };
}

export interface MetroStationAPIType {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  geometry_name: string;
  properties: {
    CODI_GRUP_STACIO: number;
    NOM_STACIO: string;
    PICTO: string;
    DATA: string;
  };
}

interface MetroStationsAPIType {
  type: "FeatureCollection";
  features: ReadonlyArray<MetroStationAPIType>;
  totalFeatures: number;
  numberMatched: number;
  numberReturned: number;
  timeStamp: string;
  crs: {
    type: "name";
    properties: {
      name: string;
    };
  };
}

export default class MetroDataSource extends TmbApiDataSource {
  //Transforms e.g. L1L2 into [L1, L2]
  parseLines(lines: string): string[] {
    return lines.replace(/L/g, ",L").split(",").filter(Boolean);
  }

  metroStationReducer(data: MetroStationAPIType): MetroStationType {
    return {
      id: data.properties["CODI_GRUP_ESTACIO"],
      name: data.properties["NOM_ESTACIO"],
      location: {
        longitude: data.geometry.coordinates[0],
        latitude: data.geometry.coordinates[1],
      },
      lines: this.parseLines(data.properties["PICTO"]),
    };
  }

  async getStation({
    id,
    name,
    closest,
  }: FindByInput): Promise<MetroStationType | null> {
    const path = ["estacions", id].filter(Boolean).join("/");
    const nameFilterParameter = name ? { filter: `NOM_ESTACIO='${name}'` } : {};

    const response: MetroStationsAPIType | null = await this.get(
      path,
      nameFilterParameter
    );

    if (Array.isArray(response?.features) && response?.features.length === 0) {
      return new ApolloError(
        `No stations were found with these parameters: ${JSON.stringify({
          id,
          name,
          closest,
        })}`
      );
    }

    //If returning more than one occurrence and closest exists, try to get the closest station
    const getClosest = Number(response?.features?.length) > 1 && closest;

    const station: MetroStationAPIType | null = getClosest
      ? getClosestMetroStation(
          response?.features as MetroStationAPIType[],
          closest as CoordinatesType
        )
      : response?.features?.[0] ?? null;

    if (station == null) {
      return new ApolloError("The station object returned did not exist");
    }

    return this.metroStationReducer(station);
  }

  async getAllStations(): Promise<MetroStationType[]> {
    const response: MetroStationsAPIType | null = await this.get("estacions");

    const stations =
      response?.features?.map((station: MetroStationAPIType) =>
        this.metroStationReducer(station)
      ) ?? [];

    return stations;
  }

  metroLineReducer({ properties }: MetroLineAPIType): MetroLineType {
    return {
      id: properties["CODI_LINIA"],
      name: properties["NOM_LINIA"],
      originStation: properties["ORIGEN_LINIA"] as any,
      endingStation: properties["DESTI_LINIA"] as any,
      stations: null,
      color: properties["COLOR_LINIA"],
    };
  }

  async getLineStations({
    id,
    name,
  }: FindByInput): Promise<MetroStationType[]> {
    const path = ["linies/metro", id, "estacions"].filter(Boolean).join("/");
    const nameFilterParameter = name ? { filter: `NOM_LINIA='${name}'` } : {};

    const response = await this.get(path, nameFilterParameter);

    const stations =
      response?.features?.map((station) => this.metroStationReducer(station)) ??
      [];

    return stations;
  }

  async getLine({ id, name }: FindByInput): Promise<MetroLineType | null> {
    const path = ["linies/metro", id].filter(Boolean).join("/");
    const nameFilterParameter = name ? { filter: `NOM_LINIA='${name}'` } : {};

    const response = await this.get(path, nameFilterParameter);

    if (Array.isArray(response?.features) && response?.features.length === 0) {
      return new ApolloError(
        `No metro lines were found with these parameters: ${JSON.stringify({
          id,
          name,
        })}`
      );
    }

    const line: MetroLineType | null = response?.features?.[0]
      ? this.metroLineReducer(response?.features?.[0])
      : null;

    if (line == null) {
      return new ApolloError("The line object returned did not exist");
    }

    const stations = await this.getLineStations({ id, name });

    return {
      ...line,
      stations: stations as any,
      originStation:
        stations?.find((station) => station.name === line.originStation) ??
        null,
      endingStation:
        stations?.find((station) => station.name === line.endingStation) ??
        null,
    };
  }

  async getAllLines(): Promise<MetroLineType[]> {
    const response: MetroLinesAPIType | null = await this.get("linies/metro");

    const lines = await Promise.all(
      (response?.features ?? []).map(async (line: MetroLineAPIType) => {
        const reducedLine = this.metroLineReducer(line);
        const stations = await this.getLineStations({
          id: reducedLine.id,
          name: reducedLine.name,
        });

        return {
          ...reducedLine,
          stations: stations as any,
          originStation:
            stations?.find(
              (station) => station.name === reducedLine.originStation
            ) ?? null,
          endingStation:
            stations?.find(
              (station) => station.name === reducedLine.endingStation
            ) ?? null,
        };
      })
    );

    return lines;
  }
}
