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
export interface RootQuery {
  __typename?: 'RootQuery';
  /** Information about the metro stations of the city of Barcelona */
  metroStations: Maybe<MetroStationConnection>;
  /** Returns the information about a metro station */
  metroStation: Maybe<MetroStationQueryResponse>;
  /** Returns the information about a metro line */
  metroLine: Maybe<MetroLineQueryResponse>;
  /** Information about the metro lines of the city of Barcelona */
  metroLines: Maybe<MetroLineConnection>;
  /** Information about the public bike stations (SMOU) of the city of Barcelona */
  bikeStations: Maybe<BikeStationConnection>;
  /** Returns the information about a bike station */
  bikeStation: Maybe<BikeStationQueryResponse>;
}


/** Root Query */
export interface RootQueryMetroStationsArgs {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
  filterBy: Maybe<FilterByInputMetro>;
}


/** Root Query */
export interface RootQueryMetroStationArgs {
  findBy: FindByInput;
}


/** Root Query */
export interface RootQueryMetroLineArgs {
  findBy: FindByInput;
}


/** Root Query */
export interface RootQueryMetroLinesArgs {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
}


/** Root Query */
export interface RootQueryBikeStationsArgs {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
  filterBy: Maybe<FilterByInputBike>;
}


/** Root Query */
export interface RootQueryBikeStationArgs {
  findBy: FindByInput;
}

/** A connection to a list of items. */
export interface MetroStationConnection {
  __typename?: 'MetroStationConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<MetroStationEdge>>>;
}

/** Information about pagination in a connection. */
export interface PageInfo {
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
export interface MetroStationEdge {
  __typename?: 'MetroStationEdge';
  /** The item at the end of the edge */
  node: Maybe<MetroStation>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
}

/** Metro station information */
export interface MetroStation {
  __typename?: 'MetroStation';
  /** Unique ID of the station */
  id: Maybe<Scalars['ID']>;
  /** Name of the station */
  name: Maybe<Scalars['String']>;
  /** Location coordinates of the station */
  location: Maybe<CoordinatesOutput>;
  /** Lines the station belongs to e.g. L1, L2 */
  lines: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Coordinates (Latitude, Longitude, Altitude), of a given station/stop */
export interface CoordinatesOutput {
  __typename?: 'CoordinatesOutput';
  latitude: Maybe<Scalars['Float']>;
  longitude: Maybe<Scalars['Float']>;
  altitude: Maybe<Scalars['Float']>;
}

/** Input for the filterBy argument of the metro queries, which allows filtering a connection by some parameters (e.g. lineName or lineId) */
export interface FilterByInputMetro {
  lineId: Maybe<Scalars['Int']>;
  lineName: Maybe<Scalars['String']>;
}

export type MetroStationQueryResponse = MetroStation | NotFoundError;

export interface NotFoundError {
  __typename?: 'NotFoundError';
  /** Search params that resulted in a not found error */
  params: Maybe<Scalars['JSON']>;
}


/** Input for the FindBy argument of the queries, which allows finding an entity by some parameters (e.g. name or id) */
export interface FindByInput {
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
  /** Finds the closest station given some coordinates */
  closest: Maybe<CoordinatesInput>;
}

/** Coordinates (Latitude, Longitude, Altitude), of a given station/stop */
export interface CoordinatesInput {
  latitude: Maybe<Scalars['Float']>;
  longitude: Maybe<Scalars['Float']>;
  altitude: Maybe<Scalars['Float']>;
}

export type MetroLineQueryResponse = MetroLine | NotFoundError;

/** Metro line information */
export interface MetroLine {
  __typename?: 'MetroLine';
  /** Numeric Code of the line */
  id: Maybe<Scalars['Int']>;
  /** Name of the line */
  name: Maybe<Scalars['String']>;
  /** Origin station of the line */
  originStation: Maybe<MetroStation>;
  /** Ending station of the line */
  endingStation: Maybe<MetroStation>;
  /** Stations of the line */
  stations: Maybe<MetroStationConnection>;
  /** Color of the line represented as a Hexadecimal string */
  color: Maybe<Scalars['String']>;
}


/** Metro line information */
export interface MetroLineStationsArgs {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
}

/** A connection to a list of items. */
export interface MetroLineConnection {
  __typename?: 'MetroLineConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<MetroLineEdge>>>;
}

/** An edge in a connection. */
export interface MetroLineEdge {
  __typename?: 'MetroLineEdge';
  /** The item at the end of the edge */
  node: Maybe<MetroLine>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
}

/** A connection to a list of items. */
export interface BikeStationConnection {
  __typename?: 'BikeStationConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<BikeStationEdge>>>;
}

/** An edge in a connection. */
export interface BikeStationEdge {
  __typename?: 'BikeStationEdge';
  /** The item at the end of the edge */
  node: Maybe<BikeStation>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
}

/** Bike station information */
export interface BikeStation {
  __typename?: 'BikeStation';
  /** Unique ID of the station */
  id: Maybe<Scalars['ID']>;
  /** Status of the station e.g. IN_SERVICE */
  status: Maybe<BikeStationStatus>;
  /** Last updated information timestamp (in ms since epoch) */
  lastUpdated: Maybe<Scalars['Int']>;
  /** Name of the station */
  name: Maybe<Scalars['String']>;
  /** Total number of bikes the station has */
  capacity: Maybe<Scalars['Int']>;
  /** Location coordinates of the station */
  location: Maybe<CoordinatesOutput>;
  /** Information about the available bikes and docks of the station */
  available: Maybe<BikeStationAvailabilityInfo>;
}

export enum BikeStationStatus {
  InService = 'IN_SERVICE',
  Maintenance = 'MAINTENANCE',
  Closed = 'CLOSED'
}

/** Information about the available bikes and docks of the station */
export interface BikeStationAvailabilityInfo {
  __typename?: 'BikeStationAvailabilityInfo';
  /** Number of available bikes in the station by type */
  bikes: Maybe<BikeAvailabilityInfo>;
  /** Number of available docks in the station */
  docks: Maybe<Scalars['Int']>;
}

/** Information of the bike availability of a station by type */
export interface BikeAvailabilityInfo {
  __typename?: 'BikeAvailabilityInfo';
  /** Number of available electrical bikes in the station */
  electrical: Maybe<Scalars['Int']>;
  /** Number of available mechanical bikes in the station */
  mechanical: Maybe<Scalars['Int']>;
  /** Total number of available bikes in the station */
  total: Maybe<Scalars['Int']>;
}

/** Input for the filterBy argument of the bikes queries, which allows filtering a connection by some parameters (e.g. only with available bikes) */
export interface FilterByInputBike {
  only: Maybe<OnlyFilterByInputBike>;
}

export interface OnlyFilterByInputBike {
  hasAvailableBikes: Maybe<Scalars['Boolean']>;
  hasAvailableElectricalBikes: Maybe<Scalars['Boolean']>;
  isInService: Maybe<Scalars['Boolean']>;
  hasAvailableDocks: Maybe<Scalars['Boolean']>;
}

export type BikeStationQueryResponse = BikeStation | NotFoundError;
