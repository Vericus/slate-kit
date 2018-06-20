const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { webpack: lernaAliases } = require("lerna-alias");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.s?css$/,
    use: extractSass.extract({
      use: [
        {
          loader: "css-loader"
        },
        {
          loader: "sass-loader"
        }
      ],
      // use style-loader in development
      fallback: "style-loader"
    })
  });

  storybookBaseConfig.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [
      {
        loader: require.resolve("@storybook/addon-storysource/loader"),
        options: {
          prettierConfig: {
            printWidth: 80,
            tabWidth: 2,
            parser: "babylon"
          }
        }
      }
    ],
    enforce: "pre"
  });

  storybookBaseConfig.resolve.alias = lernaAliases({
    directory: path.resolve(__dirname)
  });

  storybookBaseConfig.plugins.push(extractSass);
  return storybookBaseConfig;
};
