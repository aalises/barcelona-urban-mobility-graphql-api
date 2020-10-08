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
  message?: Maybe<Message>;
};

/** Just a message */
export type Message = {
  __typename?: 'Message';
  message?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};
