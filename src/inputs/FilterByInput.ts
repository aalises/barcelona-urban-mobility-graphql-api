import {
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";

const FilterByInputMetro = new GraphQLInputObjectType({
  name: "FilterByInputMetro",
  description:
    "Input for the filterBy argument of the metro queries, which allows filtering a connection by some parameters (e.g. lineName or lineId)",
  fields: {
    lineId: {
      type: GraphQLInt,
    },
    lineName: {
      type: GraphQLString,
    },
  },
});

const FilterByInputBike = new GraphQLInputObjectType({
  name: "FilterByInputBike",
  description:
    "Input for the filterBy argument of the bikes queries, which allows filtering a connection by some parameters (e.g. only with available bikes)",
  fields: {
    only: {
      type: new GraphQLInputObjectType({
        name: "OnlyFilterByInputBike",
        fields: {
          hasAvailableBikes: {
            type: GraphQLBoolean,
          },
          hasAvailableElectricalBikes: {
            type: GraphQLBoolean,
          },
          isInService: {
            type: GraphQLBoolean,
          },
          hasAvailableDocks: {
            type: GraphQLBoolean,
          },
        },
      }),
    },
  },
});

export { FilterByInputBike, FilterByInputMetro };
