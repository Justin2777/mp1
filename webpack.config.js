const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: { directory: path.resolve(__dirname, "build") },
    open: true,
    host: "localhost",
    watchFiles: "index.html",
  },
  context: path.join(__dirname, "src"),
  entry: "./index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif|mp4|webm)$/i,
        type: "asset",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./assets/",
          to: "./assets/",
          globOptions: {
            ignore: ["**/*.mp4"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: "body",
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
};
