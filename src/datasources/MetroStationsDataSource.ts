import TmbApiDataSource from "./TmbApiDataSource";
import type {
  FindByInput,
  MetroStation as MetroStationType,
} from "../../types";
import { ApolloError, ValidationError } from "apollo-server-lambda";

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

export default class MetroStationsDataSource extends TmbApiDataSource {
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
  }: FindByInput): Promise<MetroStationType | null> {
    if (!id && !name) {
      return new ValidationError(
        "You need to provide either a valid ID or a valid name"
      );
    }

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
        })}`
      );
    }

    const station: MetroStationAPIType | null = response?.features?.[0] ?? null;

    if (station == null) {
      return new ApolloError("The station object returned did not exist");
    }

    return this.metroStationReducer(station);
  }

  async getAllStations(): Promise<{
    numberOfStations: number | null;
    stations: MetroStationType[];
  }> {
    const response: MetroStationsAPIType | null = await this.get("estacions");

    return {
      numberOfStations: response?.numberReturned ?? null,
      stations:
        response?.features?.map((station: MetroStationAPIType) =>
          this.metroStationReducer(station)
        ) ?? [],
    };
  }
}
