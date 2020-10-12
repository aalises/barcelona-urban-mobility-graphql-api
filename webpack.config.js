/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const path = require("path");

module.exports = {
  entry: [path.join(__dirname, "src/index.ts")],
  externals: [nodeExternals({})],
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        exclude: [path.resolve(__dirname, "node_modules")],
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: "node",
};
