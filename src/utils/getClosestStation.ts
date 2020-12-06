import getDistance from "geolib/es/getDistance";
import type { BikeStationType, CoordinatesInputType } from "../../types";

import type { MetroStationAPIType } from "../datasources/MetroDataSource";

interface StationDistanceInfoInterface<T> {
  station: T;
  distance: number | null;
}

export const getClosestBikeStation = (
  stations: BikeStationType[],
  closest: CoordinatesInputType
): BikeStationType => {
  const initValue: StationDistanceInfoInterface<BikeStationType> = {
    station: stations[0],
    distance: null,
  };

  return stations.reduce(
    (
      closestStation: StationDistanceInfoInterface<BikeStationType>,
      station: BikeStationType
    ): StationDistanceInfoInterface<BikeStationType> => {
      try {
        const coordinates = station?.location ?? null;
        if (!coordinates) {
          return closestStation;
        }
        const distance = getDistance(coordinates as any, closest as any);
        if (
          closestStation.distance === null ||
          distance < Number(closestStation.distance)
        ) {
          return { station, distance };
        }
      } catch (error) {
        return closestStation;
      }

      return closestStation;
    },
    initValue
  ).station;
};

export const getClosestMetroStation = (
  stations: ReadonlyArray<MetroStationAPIType>,
  closest: CoordinatesInputType
): MetroStationAPIType => {
  const initValue: StationDistanceInfoInterface<MetroStationAPIType> = {
    station: stations[0],
    distance: null,
  };

  return stations.reduce(
    (
      closestStation: StationDistanceInfoInterface<MetroStationAPIType>,
      station: MetroStationAPIType
    ): StationDistanceInfoInterface<MetroStationAPIType> => {
      try {
        const coordinates = {
          longitude: station?.geometry.coordinates[0] ?? null,
          latitude: station?.geometry.coordinates[1] ?? null,
        };

        const distance = getDistance(coordinates, closest as any);
        if (
          closestStation.distance === null ||
          distance < Number(closestStation.distance)
        ) {
          return { station, distance };
        }
      } catch (error) {
        return closestStation;
      }

      return closestStation;
    },
    initValue
  ).station;
};
