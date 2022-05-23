/* eslint-env node */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const cssnano = require("cssnano");
const glob = require("glob");
const path = require("path");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  entry: [
    "./assets/scripts/main.js",
    "./assets/styles/styles.scss",
    ...glob.sync("./assets/icons/*.svg"),
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 2, url: false } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [cssnano(), postcssPresetEnv({ stage: 1 })],
            },
          },
          "sass-loader",
        ],
      },
      { exclude: /node_modules/, loader: "babel-loader", test: /\.js$/ },
      {
        include: path.resolve(__dirname, "./assets/icons/"),
        loader: "svg-sprite-loader",
        options: {
          extract: true,
          outputPath: "assets/icons/",
          spriteFilename: "sprite.svg",
        },
        test: /\.svg$/,
      },
    ],
  },
  output: {
    filename: "scripts/[name].bundle.js",
    path: path.resolve(__dirname, "./assets/"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
    new SpriteLoaderPlugin({ plainSprite: true }),
  ],
};
