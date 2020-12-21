# Barcelona Urban Mobility Graphql API

[![Netlify Status](https://api.netlify.com/api/v1/badges/a1b85612-974d-4aeb-8350-c78fae6dd9c0/deploy-status)](https://app.netlify.com/sites/barcelona-urban-mobility-graphql-api/deploys)
[![Coverage Status](https://coveralls.io/repos/github/aalises/barcelona-urban-mobility-graphql-api/badge.svg?branch=main)](https://coveralls.io/github/aalises/barcelona-urban-mobility-graphql-api?branch=main)

GraphQL API built using Apollo Server + Typescript that integrates information about the urban mobility services of the city of Barcelona.

It provides information about bus stops and lines, metro stations/lines, and public bikes (Bicing) stations and availability.
## GraphQL Playground 🚀

[Barcelona Urban Mobility GraphQL Playground](https://barcelona-urban-mobility-graphql-api.netlify.app/graphql)

## Usage 🔧

### Install

The installation requires node.js as the execution environment as well as npm or yarn as the package manager. Then run `npm install` or `yarn install` as a command on your commandline interface.

### Run

To run it, execute `yarn build`, and then `yarn start`. The application will be available port `9000`.

### Generate Schema

To generate the schema and Typescript types for the schema (on `src/types.d.ts`), run `schema`. This uses [GraphQL Code Generator](https://graphql-code-generator.com/)

### Test

In order to test using Jest, just run `yarn test` or `npm run test`

## Data Sources 📊

### Metro Stations / Bus Stops

For the metro stations and bus stops, we use the public `Transports Metropolitans de Barcelona (TMB)` API, at [https://developer.tmb.cat/](https://developer.tmb.cat/). 

The `App Key` and `App ID` are passed through the node's `process.env.TMB_API_APP_KEY` and `process.env.TMB_API_APP_ID` and the credentials can be obtained if you log and register an app to the portal.

### Bike Stations

For the bike stations, we use the [BSMSA](https://www.bsmsa.cat/es/) API for smou/bicing. The endpoints are:

```
https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_information
https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_status
```