import TmbApiDataSource, { ITmbApiFeatureCollection } from "./TmbApiDataSource";
import {
  FindByInputType,
  BusStopType,
  CoordinatesInputType,
  BusLineType,
} from "../../types";
import { BusStopQueryResponseType } from "../../types";
import { getClosestTmbStation } from "../utils/getClosestStation";
import type { LineAPIType } from "./TmbApiDataSource";

export interface BusStopAPIType {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  geometry_name: string;
  properties: {
    ID_PARADA: number;
    CODI_PARADA: number;
    NOM_PARADA: string;
    DESC_PARADA: string;
    CODI_INTERC: number;
    NOM_INTERC: string;
    NOM_TIPUS_PARADA: string;
    NOM_TIPUS_SIMPLE_PARADA: string;
    DESC_TIPUS_PARADA: string;
    TIPIFICACIO_PARADA: string;
    ADRECA: string;
    ID_POBLACIO: number;
    NOM_POBLACIO: string;
    ID_DISTRICTE: number;
    NOM_DISTRICTE: string;
    DATA: string;
    NOM_VIA: string;
    NOM_PROPERA_VIA: string;
    PUNTS_PARADA: number;
  };
}

export default class BusDataSource extends TmbApiDataSource {
  busStopReducer(data: BusStopAPIType): BusStopType {
    return {
      id: String(data.properties["CODI_PARADA"]),
      name: data.properties["NOM_PARADA"],
      location: {
        address: data.properties["ADRECA"],
        city: data.properties["NOM_POBLACIO"],
        district: data.properties["NOM_DISTRICTE"],
        street: data.properties["NOM_VIA"],
        coordinates: {
          longitude: data.geometry.coordinates[0],
          latitude: data.geometry.coordinates[1],
          altitude: null,
        },
      },
    };
  }

  async getStop({
    id,
    name,
    closest,
  }: FindByInputType): Promise<BusStopQueryResponseType | null> {
    const path = ["parades", id].filter(Boolean).join("/");
    const nameFilterParameter = name ? { filter: `NOM_PARADA='${name}'` } : {};

    const response: ITmbApiFeatureCollection<
      BusStopAPIType
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

    const stop: BusStopAPIType | null = getClosest
      ? getClosestTmbStation(
          response?.features as BusStopAPIType[],
          closest as CoordinatesInputType
        )
      : response?.features?.[0] ?? null;

    if (stop == null) {
      return {
        params: {
          id,
          name,
          closest,
        },
      };
    }

    return this.busStopReducer(stop);
  }

  async getLineStops({ id, name }: FindByInputType): Promise<BusStopType[]> {
    const path = ["linies/bus", id, "parades"].filter(Boolean).join("/");
    const nameFilterParameter = name ? { filter: `DESC_LINIA='${name}'` } : {};

    const response = await this.get(path, nameFilterParameter);

    const stops =
      response?.features?.map((stop) => this.busStopReducer(stop)) ?? [];

    return stops;
  }

  async getAllStops(): Promise<BusStopType[]> {
    const response: ITmbApiFeatureCollection<
      BusStopAPIType
    > | null = await this.get("parades");

    const stops =
      response?.features?.map((stop: BusStopAPIType) =>
        this.busStopReducer(stop)
      ) ?? [];

    return stops;
  }

  busLineReducer({ properties }: LineAPIType): BusLineType {
    return {
      id: properties["CODI_LINIA"],
      name: properties["DESC_LINIA"],
      originStop: properties["ORIGEN_LINIA"] as any,
      endingStop: properties["DESTI_LINIA"] as any,
      stops: null,
      color: properties["COLOR_LINIA"],
    };
  }

  async getAllLines(): Promise<BusLineType[]> {
    const response: ITmbApiFeatureCollection<
      LineAPIType
    > | null = await this.get("linies/bus");

    const lines = await Promise.all(
      (response?.features ?? []).map(async (line) => {
        const reducedLine = this.busLineReducer(line);
        const stops = await this.getLineStops({
          id: reducedLine.id,
          name: reducedLine.name,
          closest: null,
        });

        return {
          ...reducedLine,
          stops: stops as any,
          originStop:
            stops?.find((stop) => stop.name === reducedLine.originStop) ?? null,
          endingStop:
            stops?.find((stop) => stop.name === reducedLine.endingStop) ?? null,
        };
      })
    );

    return lines;
  }
}
