export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
}

/** Root Query */
export interface RootQueryType {
  __typename?: 'RootQuery';
  /** Information about the metro stations of the city of Barcelona */
  metroStations: Maybe<MetroStationConnectionType>;
  /** Returns the information about a metro station */
  metroStation: Maybe<MetroStationQueryResponseType>;
  /** Returns the information about a metro line */
  metroLine: Maybe<MetroLineQueryResponseType>;
  /** Information about the metro lines of the city of Barcelona */
  metroLines: Maybe<MetroLineConnectionType>;
  /** Information about the public bike stations (SMOU) of the city of Barcelona */
  bikeStations: Maybe<BikeStationConnectionType>;
  /** Returns the information about a bike station */
  bikeStation: Maybe<BikeStationQueryResponseType>;
  /** Returns the information about a bus stop */
  busStop: Maybe<BusStopQueryResponseType>;
  /** Information about the bus stops of the city of Barcelona */
  busStops: Maybe<BusStopConnectionType>;
}


/** Root Query */
export interface RootQueryMetroStationsArgsType {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
  filterBy: Maybe<FilterByInputMetroType>;
}


/** Root Query */
export interface RootQueryMetroStationArgsType {
  findBy: FindByInputType;
}


/** Root Query */
export interface RootQueryMetroLineArgsType {
  findBy: FindByInputType;
}


/** Root Query */
export interface RootQueryMetroLinesArgsType {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
}


/** Root Query */
export interface RootQueryBikeStationsArgsType {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
  filterBy: Maybe<FilterByInputBikeType>;
}


/** Root Query */
export interface RootQueryBikeStationArgsType {
  findBy: FindByInputType;
}


/** Root Query */
export interface RootQueryBusStopArgsType {
  findBy: FindByInputType;
}


/** Root Query */
export interface RootQueryBusStopsArgsType {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
}

/** A connection to a list of items. */
export interface MetroStationConnectionType {
  __typename?: 'MetroStationConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfoType;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<MetroStationEdgeType>>>;
}

/** Information about pagination in a connection. */
export interface PageInfoType {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['String']>;
}

/** An edge in a connection. */
export interface MetroStationEdgeType {
  __typename?: 'MetroStationEdge';
  /** The item at the end of the edge */
  node: Maybe<MetroStationType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
}

/** Metro station information */
export interface MetroStationType {
  __typename?: 'MetroStation';
  /** Unique ID of the station */
  id: Maybe<Scalars['ID']>;
  /** Name of the station */
  name: Maybe<Scalars['String']>;
  /** Location coordinates of the station */
  coordinates: Maybe<CoordinatesOutputType>;
  /** Lines the station belongs to e.g. L1, L2 */
  lines: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Coordinates (Latitude, Longitude, Altitude), of a given station/stop */
export interface CoordinatesOutputType {
  __typename?: 'CoordinatesOutput';
  latitude: Maybe<Scalars['Float']>;
  longitude: Maybe<Scalars['Float']>;
  altitude: Maybe<Scalars['Float']>;
}

/** Input for the filterBy argument of the metro queries, which allows filtering a connection by some parameters (e.g. lineName or lineId) */
export interface FilterByInputMetroType {
  lineId: Maybe<Scalars['Int']>;
  lineName: Maybe<Scalars['String']>;
}

export type MetroStationQueryResponseType = MetroStationType | NotFoundErrorType;

export interface NotFoundErrorType {
  __typename?: 'NotFoundError';
  /** Search params that resulted in a not found error */
  params: Maybe<Scalars['JSON']>;
}


/** Input for the FindBy argument of the queries, which allows finding an entity by some parameters (e.g. name or id) */
export interface FindByInputType {
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
  /** Finds the closest station given some coordinates */
  closest: Maybe<CoordinatesInputType>;
}

/** Coordinates (Latitude, Longitude, Altitude), of a given station/stop */
export interface CoordinatesInputType {
  latitude: Maybe<Scalars['Float']>;
  longitude: Maybe<Scalars['Float']>;
  altitude: Maybe<Scalars['Float']>;
}

export type MetroLineQueryResponseType = MetroLineType | NotFoundErrorType;

/** Metro line information */
export interface MetroLineType {
  __typename?: 'MetroLine';
  /** Numeric Code of the line */
  id: Maybe<Scalars['Int']>;
  /** Name of the line */
  name: Maybe<Scalars['String']>;
  /** Origin station of the line */
  originStation: Maybe<MetroStationType>;
  /** Ending station of the line */
  endingStation: Maybe<MetroStationType>;
  /** Stations of the line */
  stations: Maybe<MetroStationConnectionType>;
  /** Color of the line represented as a Hexadecimal string */
  color: Maybe<Scalars['String']>;
}


/** Metro line information */
export interface MetroLineStationsArgsType {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
}

/** A connection to a list of items. */
export interface MetroLineConnectionType {
  __typename?: 'MetroLineConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfoType;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<MetroLineEdgeType>>>;
}

/** An edge in a connection. */
export interface MetroLineEdgeType {
  __typename?: 'MetroLineEdge';
  /** The item at the end of the edge */
  node: Maybe<MetroLineType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
}

/** A connection to a list of items. */
export interface BikeStationConnectionType {
  __typename?: 'BikeStationConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfoType;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<BikeStationEdgeType>>>;
}

/** An edge in a connection. */
export interface BikeStationEdgeType {
  __typename?: 'BikeStationEdge';
  /** The item at the end of the edge */
  node: Maybe<BikeStationType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
}

/** Bike station information */
export interface BikeStationType {
  __typename?: 'BikeStation';
  /** Unique ID of the station */
  id: Maybe<Scalars['ID']>;
  /** Status of the station e.g. IN_SERVICE */
  status: Maybe<BikeStationStatusType>;
  /** Last updated information timestamp (in ms since epoch) */
  lastUpdated: Maybe<Scalars['Int']>;
  /** Name of the station */
  name: Maybe<Scalars['String']>;
  /** Total number of bikes the station has */
  capacity: Maybe<Scalars['Int']>;
  /** Location coordinates of the station */
  coordinates: Maybe<CoordinatesOutputType>;
  /** Information about the available bikes and docks of the station */
  available: Maybe<BikeStationAvailabilityInfoType>;
}

export enum BikeStationStatusType {
  InServiceType = 'IN_SERVICE',
  MaintenanceType = 'MAINTENANCE',
  ClosedType = 'CLOSED'
}

/** Information about the available bikes and docks of the station */
export interface BikeStationAvailabilityInfoType {
  __typename?: 'BikeStationAvailabilityInfo';
  /** Number of available bikes in the station by type */
  bikes: Maybe<BikeAvailabilityInfoType>;
  /** Number of available docks in the station */
  docks: Maybe<Scalars['Int']>;
}

/** Information of the bike availability of a station by type */
export interface BikeAvailabilityInfoType {
  __typename?: 'BikeAvailabilityInfo';
  /** Number of available electrical bikes in the station */
  electrical: Maybe<Scalars['Int']>;
  /** Number of available mechanical bikes in the station */
  mechanical: Maybe<Scalars['Int']>;
  /** Total number of available bikes in the station */
  total: Maybe<Scalars['Int']>;
}

/** Input for the filterBy argument of the bikes queries, which allows filtering a connection by some parameters (e.g. only with available bikes) */
export interface FilterByInputBikeType {
  only: Maybe<OnlyFilterByInputBikeType>;
}

export interface OnlyFilterByInputBikeType {
  hasAvailableBikes: Maybe<Scalars['Boolean']>;
  hasAvailableElectricalBikes: Maybe<Scalars['Boolean']>;
  isInService: Maybe<Scalars['Boolean']>;
  hasAvailableDocks: Maybe<Scalars['Boolean']>;
}

export type BikeStationQueryResponseType = BikeStationType | NotFoundErrorType;

export type BusStopQueryResponseType = BusStopType | NotFoundErrorType;

/** Bus stop information */
export interface BusStopType {
  __typename?: 'BusStop';
  /** Unique ID of the stop */
  id: Maybe<Scalars['ID']>;
  /** Name of the stop */
  name: Maybe<Scalars['String']>;
  /** Location of the stop */
  location: Maybe<LocationType>;
}

/** Location of a stop/station */
export interface LocationType {
  __typename?: 'Location';
  address: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  district: Maybe<Scalars['String']>;
  street: Maybe<Scalars['String']>;
  coordinates: Maybe<CoordinatesOutputType>;
}

/** A connection to a list of items. */
export interface BusStopConnectionType {
  __typename?: 'BusStopConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfoType;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<BusStopEdgeType>>>;
}

/** An edge in a connection. */
export interface BusStopEdgeType {
  __typename?: 'BusStopEdge';
  /** The item at the end of the edge */
  node: Maybe<BusStopType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
}
