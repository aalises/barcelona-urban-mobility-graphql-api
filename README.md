# Barcelona Urban Mobility Graphql API 

GraphQL API built using Apollo Server that integrates information about the urban mobility of the city of Barcelona. 

It provides information about bus stops and lines, metro stations/lines, and public bikes (Bicing) stations and availability.

- [ ] `metroLines` query with information about metro lines
- [ ] `metroStations` query with information about metro stations
- [ ] `busLines` query with information about bus lines
- [ ] `busStops` query with information about bus stops
- [ ] `bikeStations` query with information about bike stations
- [ ] Add bike availability information to the `bikeStations` query
- [ ] Add filtering of the stops/stations by line ID or name

## Usage

### Install

The installation requires node.js as the execution environment as well as npm or yarn as the package manager. Then run `npm install` or `yarn install` as a command on your commandline interface.

### Run

To run it, execute `build:prod` (Production) or `build:dev` (Development), depending on the environment you want to work on, and then run `start`. 

The application will be available on the `PORT` environment variable, or `4000` as the default port.

### Generate Schema

To generate the schema and Typescript types for the schema (on `src/types.d.ts`), run `schema`. This uses [GraphQL Code Generator](https://graphql-code-generator.com/)

### Data Sources

TODO

