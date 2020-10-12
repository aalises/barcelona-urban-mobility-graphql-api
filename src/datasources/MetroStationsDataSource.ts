import { RESTDataSource } from "apollo-datasource-rest";
import {
  TMB_API_BASE_URL,
  TMB_API_APP_ID,
  TMB_API_APP_KEY,
} from "../environment";
export default class MetroStationsDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = TMB_API_BASE_URL;
  }

  async getAllStations(): Promise<any> {
    const response = await this.get("estacions", {
      app_id: TMB_API_APP_ID,
      app_key: TMB_API_APP_KEY,
    });
    return response;
  }
}
