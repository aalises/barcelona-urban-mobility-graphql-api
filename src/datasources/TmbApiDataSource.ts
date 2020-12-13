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
export default class TmbApiDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = TMB_API_BASE_URL;
  }

  //We add the authorization params to the get method
  async get<TResult = any>(path, params?, init?): Promise<TResult> {
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
