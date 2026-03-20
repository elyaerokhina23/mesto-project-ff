import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

export default {
  entry: "./src/scripts/index.js",

  output: {
    path: path.resolve("dist"),
    filename: "bundle.js",
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            targets: "defaults",
            presets: [["@babel/preset-env"]],
          },
        },
      },

      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },

      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },

  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
};
