import { RESTDataSource } from "apollo-datasource-rest";
import type {
  FindByInput,
  MetroStation as MetroStationType,
} from "../../types";
import { TMB_API_BASE_URL } from "../config";
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

export default class MetroStationsDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = TMB_API_BASE_URL;
  }

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

  async getStation({ id }: FindByInput): Promise<MetroStationType | null> {
    if (!id) {
      return new ValidationError("You need to provide an ID");
    }

    const path = ["estacions", id].filter(Boolean).join("/");

    const response: MetroStationsAPIType | null = await this.get(path, {
      app_id: process.env.TMB_API_APP_ID ?? "",
      app_key: process.env.TMB_API_APP_KEY ?? "",
    });

    if (Array.isArray(response?.features) && response?.features.length === 0) {
      return new ApolloError(`No stations were found with the ID: ${id}`);
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
    const response: MetroStationsAPIType | null = await this.get("estacions", {
      app_id: process.env.TMB_API_APP_ID ?? "",
      app_key: process.env.TMB_API_APP_KEY ?? "",
    });

    return {
      numberOfStations: response?.numberReturned ?? null,
      stations:
        response?.features?.map((station: MetroStationAPIType) =>
          this.metroStationReducer(station)
        ) ?? [],
    };
  }
}
