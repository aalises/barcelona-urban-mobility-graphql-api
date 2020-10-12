import { RESTDataSource } from "apollo-datasource-rest";
import type { MetroStation as MetroStationType } from "../types";
import {
  TMB_API_BASE_URL,
  TMB_API_APP_ID,
  TMB_API_APP_KEY,
} from "../environment";

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
      id: data.id,
      name: data.properties["NOM_ESTACIO"],
      location: {
        longitude: data.geometry.coordinates[0],
        latitude: data.geometry.coordinates[1],
      },
      lines: this.parseLines(data.properties["PICTO"]),
    };
  }

  async getAllStations(): Promise<{
    numberOfStations: number;
    stations: MetroStationType[];
  }> {
    const response: MetroStationsAPIType = await this.get("estacions", {
      app_id: TMB_API_APP_ID,
      app_key: TMB_API_APP_KEY,
    });

    return {
      numberOfStations: response.numberReturned,
      stations: response.features.map((station: MetroStationAPIType) =>
        this.metroStationReducer(station)
      ),
    };
  }
}
