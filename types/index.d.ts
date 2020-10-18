export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Root Query */
export type RootQuery = {
  __typename?: 'RootQuery';
  metroStations?: Maybe<MetroStations>;
  busStops?: Maybe<BusStops>;
};


/** Root Query */
export type RootQueryMetroStationsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Root Query */
export type RootQueryBusStopsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

/** Information about the metro stations of the city of Barcelona */
export type MetroStations = {
  __typename?: 'MetroStations';
  /** Connection with the data about stations */
  stations?: Maybe<MetroStationConnection>;
  /** Total number of stations */
  numberOfStations?: Maybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type MetroStationConnection = {
  __typename?: 'MetroStationConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MetroStationEdge>>>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

/** An edge in a connection. */
export type MetroStationEdge = {
  __typename?: 'MetroStationEdge';
  /** The item at the end of the edge */
  node?: Maybe<MetroStation>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** Metro station information */
export type MetroStation = {
  __typename?: 'MetroStation';
  /** Unique ID of the station */
  id?: Maybe<Scalars['ID']>;
  /** Name of the station */
  name?: Maybe<Scalars['String']>;
  /** Location coordinates of the station */
  location?: Maybe<Coordinates>;
  /** Lines the station belongs to e.g. L1, L2 */
  lines?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Coordinates (Latitude, Longitude, Altitude), of a given station/stop */
export type Coordinates = {
  __typename?: 'Coordinates';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  altitude?: Maybe<Scalars['Float']>;
};

/** Information about the bus stops of the city of Barcelona */
export type BusStops = {
  __typename?: 'BusStops';
  /** Connection with the data about stops */
  stops?: Maybe<BusStopConnection>;
  /** Total number of stops */
  numberOfStops?: Maybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type BusStopConnection = {
  __typename?: 'BusStopConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<BusStopEdge>>>;
};

/** An edge in a connection. */
export type BusStopEdge = {
  __typename?: 'BusStopEdge';
  /** The item at the end of the edge */
  node?: Maybe<BusStop>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** Bus stop information */
export type BusStop = {
  __typename?: 'BusStop';
  /** Unique ID of the stop */
  id?: Maybe<Scalars['ID']>;
  /** Name of the stop */
  name?: Maybe<Scalars['String']>;
  /** Location coordinates of the stop */
  location?: Maybe<Coordinates>;
  /** Lines the stop belongs to e.g. 92, 73 */
  lines?: Maybe<Array<Maybe<Scalars['String']>>>;
};
