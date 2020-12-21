import { RESTDataSource } from "apollo-datasource-rest";
import { TMB_API_BASE_URL } from "../config";

export interface ITmbApiFeatureCollection<T> {
  type: "FeatureCollection";
  features: ReadonlyArray<T>;
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

export interface LineAPIType {
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

export default class TmbApiDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = TMB_API_BASE_URL;
  }

  //We add the authorization params to the get method
  async get<TResult = any>(
    path: string,
    params = {},
    init = {}
  ): Promise<TResult> {
    return super.get(
      path,
      {
        ...params,
        app_id: process.env.TMB_API_APP_ID ?? "",
        app_key: process.env.TMB_API_APP_KEY ?? "",
      },
      init
    );
  }
}
