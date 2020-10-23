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
  metroStation?: Maybe<MetroStation>;
  metroLine?: Maybe<MetroLine>;
  metroLines?: Maybe<MetroLines>;
};


/** Root Query */
export type RootQueryMetroStationsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/** Root Query */
export type RootQueryMetroStationArgs = {
  findBy: FindByInput;
};


/** Root Query */
export type RootQueryMetroLineArgs = {
  findBy: FindByInput;
};


/** Root Query */
export type RootQueryMetroLinesArgs = {
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

/** Input for the FindBy argument of the queries, which allows finding an entity by some parameters (e.g. name or id) */
export type FindByInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** Metro line information */
export type MetroLine = {
  __typename?: 'MetroLine';
  /** Numeric Code of the line */
  id?: Maybe<Scalars['Int']>;
  /** Name of the line */
  name?: Maybe<Scalars['String']>;
  /** Origin station of the line */
  originStation?: Maybe<MetroStation>;
  /** Ending station of the line */
  endingStation?: Maybe<MetroStation>;
  /** Stations of the line */
  stations?: Maybe<MetroStationConnection>;
  /** Color of the line represented as a Hexadecimal string */
  color?: Maybe<Scalars['String']>;
};


/** Metro line information */
export type MetroLineStationsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

/** Information about the metro lines of the city of Barcelona */
export type MetroLines = {
  __typename?: 'MetroLines';
  /** Connection with the data about lines */
  lines?: Maybe<MetroLineConnection>;
  /** Total number of lines */
  numberOfLines?: Maybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type MetroLineConnection = {
  __typename?: 'MetroLineConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MetroLineEdge>>>;
};

/** An edge in a connection. */
export type MetroLineEdge = {
  __typename?: 'MetroLineEdge';
  /** The item at the end of the edge */
  node?: Maybe<MetroLine>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};
