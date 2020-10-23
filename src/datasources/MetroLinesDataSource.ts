import { TMB_API_BASE_URL } from "../config";
import { ApolloError, ValidationError } from "apollo-server-lambda";
import {
  FindByInput,
  MetroLine as MetroLineType,
  MetroStation as MetroStationType,
} from "../../types";
import MetroStationDataSource from "./MetroStationsDataSource";
import TmbApiDataSource from "./TmbApiDataSource";

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

export default class MetroLinesDataSource extends TmbApiDataSource {
  constructor() {
    super();
    this.baseURL = TMB_API_BASE_URL;
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
  }: FindByInput): Promise<MetroStationType[] | null> {
    const path = ["linies/metro", id, "estacions"].filter(Boolean).join("/");
    const nameFilterParameter = name ? { filter: `NOM_LINIA='${name}'` } : {};

    const response = await this.get(path, nameFilterParameter);

    const stations =
      response?.features?.map((station) =>
        new MetroStationDataSource().metroStationReducer(station)
      ) ?? [];

    return stations;
  }

  async getLine({ id, name }: FindByInput): Promise<MetroLineType | null> {
    if (!id && !name) {
      return new ValidationError(
        "You need to provide either a valid ID or a valid name"
      );
    }

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

  async getAllLines(): Promise<{
    numberOfLines: number | null;
    lines: MetroLineType[];
  }> {
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

    return {
      numberOfLines: response?.numberReturned ?? null,
      lines,
    };
  }
}
