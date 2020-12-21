import TmbApiDataSource, { ITmbApiFeatureCollection } from "./TmbApiDataSource";
import type {
  FindByInputType,
  MetroStationType,
  MetroStationQueryResponseType,
  MetroLineType,
  MetroLineQueryResponseType,
  CoordinatesInputType,
} from "../../types";
import { getClosestTmbStation } from "../utils/getClosestStation";
import type { LineAPIType } from "./TmbApiDataSource";

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

export default class MetroDataSource extends TmbApiDataSource {
  //Transforms e.g. L1L2 into [L1, L2]
  parseLines(lines: string): string[] {
    return lines.replace(/L/g, ",L").split(",").filter(Boolean);
  }

  metroStationReducer(data: MetroStationAPIType): MetroStationType {
    return {
      id: data.properties["CODI_GRUP_ESTACIO"],
      name: data.properties["NOM_ESTACIO"],
      coordinates: {
        longitude: data.geometry.coordinates[0],
        latitude: data.geometry.coordinates[1],
        altitude: null,
      },
      lines: this.parseLines(data.properties["PICTO"]),
    };
  }

  async getStation({
    id,
    name,
    closest,
  }: FindByInputType): Promise<MetroStationQueryResponseType | null> {
    const path = ["estacions", id].filter(Boolean).join("/");
    const nameFilterParameter = name ? { filter: `NOM_ESTACIO='${name}'` } : {};

    const response: ITmbApiFeatureCollection<
      MetroStationAPIType
    > | null = await this.get(path, nameFilterParameter);

    if (Array.isArray(response?.features) && response?.features.length === 0) {
      return {
        params: {
          id,
          name,
          closest,
        },
      };
    }

    //If returning more than one occurrence and closest exists, try to get the closest station
    const getClosest = Number(response?.features?.length) > 1 && closest;

    const station: MetroStationAPIType | null = getClosest
      ? getClosestTmbStation(
          response?.features as MetroStationAPIType[],
          closest as CoordinatesInputType
        )
      : response?.features?.[0] ?? null;

    if (station == null) {
      return {
        params: {
          id,
          name,
          closest,
        },
      };
    }

    return this.metroStationReducer(station);
  }

  async getAllStations(): Promise<MetroStationType[]> {
    const response: ITmbApiFeatureCollection<
      MetroStationAPIType
    > | null = await this.get("estacions");

    const stations =
      response?.features?.map((station: MetroStationAPIType) =>
        this.metroStationReducer(station)
      ) ?? [];

    return stations;
  }

  metroLineReducer({ properties }: LineAPIType): MetroLineType {
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
  }: FindByInputType): Promise<MetroStationType[]> {
    const path = ["linies/metro", id, "estacions"].filter(Boolean).join("/");
    const nameFilterParameter = name ? { filter: `NOM_LINIA='${name}'` } : {};

    const response = await this.get(path, nameFilterParameter);

    const stations =
      response?.features?.map((station) => this.metroStationReducer(station)) ??
      [];

    return stations;
  }

  async getLine({
    id,
    name,
  }: FindByInputType): Promise<MetroLineQueryResponseType | null> {
    const path = ["linies/metro", id].filter(Boolean).join("/");
    const nameFilterParameter = name ? { filter: `NOM_LINIA='${name}'` } : {};

    const response = await this.get(path, nameFilterParameter);

    if (Array.isArray(response?.features) && response?.features.length === 0) {
      return {
        params: {
          id,
          name,
        },
      };
    }

    const line: MetroLineType | null = response?.features?.[0]
      ? this.metroLineReducer(response?.features?.[0])
      : null;

    if (line == null) {
      return {
        params: {
          id,
          name,
        },
      };
    }

    const stations = await this.getLineStations({ id, name, closest: null });

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
    const response: ITmbApiFeatureCollection<
      LineAPIType
    > | null = await this.get("linies/metro");

    const lines = await Promise.all(
      (response?.features ?? []).map(async (line: LineAPIType) => {
        const reducedLine = this.metroLineReducer(line);
        const stations = await this.getLineStations({
          id: reducedLine.id,
          name: reducedLine.name,
          closest: null,
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
