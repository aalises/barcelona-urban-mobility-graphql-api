# Barcelona Urban Mobility Graphql API

[![Netlify Status](https://api.netlify.com/api/v1/badges/a1b85612-974d-4aeb-8350-c78fae6dd9c0/deploy-status)](https://app.netlify.com/sites/barcelona-urban-mobility-graphql-api/deploys)

GraphQL API built using Apollo Server + Typescript that integrates information about the urban mobility services of the city of Barcelona.

It provides information about bus stops and lines, metro stations/lines, and public bikes (Bicing) stations and availability.

### Feature Roadmap / Checklist for v1.0.0

- [x] `metroStations` query with information about metro stations
- [ ] `metroStation` query with information about one metro station (find by name or id)
- [ ] `metroLines` query with information about metro lines
- [ ] `metroLine` query with information about one metro line (find by name or id)
- [ ] `busStops` query with information about bus stops
- [ ] `busStop` query with information about one bus stop (find by name or id)
- [ ] `busLines` query with information about bus lines
- [ ] `busLine` query with information about a bus line (find by name or id)
- [ ] `bikeStations` query with information about bike stations
- [ ] `bikeStation` query with information about one bike station (find by name or id)
- [ ] Add bike availability information to the `bikeStations` query
- [ ] Add filtering of the stations by line ID or name (cannot do it on BusStops)

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

### Metro Stations

For the metro stations, we use the public `Transports Metropolitans de Barcelona (TMB)` API, at [https://developer.tmb.cat/](https://developer.tmb.cat/). The endpoint used it:

```
https://api.tmb.cat/v1/transit/estacions?app_id=XXX&app_key=XXX
```

The `App Key` and `App ID` are passed through the node's `process.env.TMB_API_APP_KEY` and `process.env.TMB_API_APP_ID` and the credentials can be obtained if you log and register an app to the portal.
