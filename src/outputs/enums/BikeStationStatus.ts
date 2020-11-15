import { GraphQLEnumType } from "graphql";

export default new GraphQLEnumType({
  name: "BikeStationStatus",
  values: {
    IN_SERVICE: {
      value: "IN_SERVICE",
    },
    MAINTENANCE: {
      value: "MAINTENANCE",
    },
    CLOSED: {
      value: "CLOSED",
    },
  },
});
