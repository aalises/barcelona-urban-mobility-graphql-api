import { RESTDataSource } from "apollo-datasource-rest";
import { SMOU_API_BASE_URL } from "../config";
import type {
  FindByInputType,
  BikeStationType,
  BikeStationQueryResponseType,
  BikeStationStatusType,
} from "../../types";
import { getClosestBikeStation } from "../utils/getClosestStation";
interface StationInfo {
  address: string;
  altitude: number;
  capacity: number;
  lat: number;
  lon: number;
  name: string;
  nearby_distance: number;
  physical_configuration: "MECHANICBIKESTATION" | "ELECTRICBIKESTATION";
  post_code: string;
  station_id: number;
}

interface StationStatus {
  station_id: number;
  is_charging_station: boolean;
  is_installed: 1 | 0;
  is_renting: 1 | 0;
  is_returning: 1 | 0;
  last_reported: number;
  num_bikes_available: number;
  num_bikes_available_types: {
    ebike: number;
    mechanical: number;
  };
  num_docks_available: number;
  status: "IN_SERVICE" | "MAINTENANCE" | "CLOSED";
}

interface StationInfoAPIResponse {
  last_updated: number;
  ttl: number;
  data: {
    stations: ReadonlyArray<StationInfo>;
  };
}

interface StationStatusAPIResponse {
  last_updated: number;
  ttl: number;
  data: {
    stations: ReadonlyArray<StationStatus>;
  };
}

export default class BikeDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = SMOU_API_BASE_URL;
  }

  bikeStationReducer(
    stationInfoData: StationInfo | null,
    stationStatusData: StationStatus | null
  ): BikeStationType {
    const reducedStationInfo = {
      id: String(stationInfoData?.station_id) ?? null,
      name: stationInfoData?.name ?? null,
      capacity: stationInfoData?.capacity ?? null,
      coordinates: {
        latitude: stationInfoData?.lat ?? null,
        longitude: stationInfoData?.lon ?? null,
        altitude: stationInfoData?.altitude ?? null,
      },
    };

    const reducedStationStatus = {
      status: (stationStatusData?.status as BikeStationStatusType) ?? null,
      lastUpdated: stationStatusData?.last_reported ?? null,
      available: {
        bikes: {
          electrical:
            stationStatusData?.num_bikes_available_types?.ebike ?? null,
          mechanical:
            stationStatusData?.num_bikes_available_types?.mechanical ?? null,
          total: stationStatusData?.num_bikes_available ?? null,
        },
        docks: stationStatusData?.num_docks_available ?? null,
      },
    };

    return {
      ...reducedStationInfo,
      ...reducedStationStatus,
    };
  }

  async getStation({
    id,
    name,
    closest,
  }: FindByInputType): Promise<BikeStationQueryResponseType | null> {
    const stations = await this.getAllStations();

    if (id) {
      const stationsById =
        stations?.find(({ id: stationId }) => stationId === String(id)) ?? null;

      if (stationsById) {
        return stationsById;
      }
    }

    if (name) {
      const stationsByName =
        stations?.find(
          ({ name: stationName }) => stationName === String(name)
        ) ?? null;

      if (stationsByName) {
        return stationsByName;
      }
    }

    if (closest) {
      const stationsByProximity = getClosestBikeStation(stations, closest);
      if (stationsByProximity) {
        return stationsByProximity;
      }
    }

    return {
      params: {
        id,
        name,
        closest,
      },
    };
  }

  async getAllStations(): Promise<BikeStationType[]> {
    const stationInfoResponse: StationInfoAPIResponse | null = await this.get(
      "station_information"
    );
    const stationStatusResponse: StationStatusAPIResponse | null = await this.get(
      "station_status"
    );

    return (
      stationInfoResponse?.data?.stations?.map(
        (stationInfoData: StationInfo | null) => {
          const stationStatusData: StationStatus | null =
            stationStatusResponse?.data?.stations?.find(
              ({ station_id }) => station_id === stationInfoData?.station_id
            ) ?? null;

          return this.bikeStationReducer(stationInfoData, stationStatusData);
        }
      ) ?? []
    );
  }
}
