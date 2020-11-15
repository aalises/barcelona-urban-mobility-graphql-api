import {
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from "graphql";

const fields = ({ isInputObject }: { isInputObject: boolean }) => ({
  name: `Coordinates${isInputObject ? "Input" : "Output"}`,
  description:
    "Coordinates (Latitude, Longitude, Altitude), of a given station/stop",
  fields: {
    latitude: {
      type: GraphQLFloat,
    },
    longitude: {
      type: GraphQLFloat,
    },
    altitude: {
      type: GraphQLFloat,
    },
  },
});

const CoordinatesInput = new GraphQLInputObjectType(
  fields({ isInputObject: true })
);
const CoordinatesOutput = new GraphQLObjectType(
  fields({ isInputObject: false })
);
export { CoordinatesInput, CoordinatesOutput };
