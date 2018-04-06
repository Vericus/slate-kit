const path = require("path");

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.s?css$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    include: [
      path.resolve(__dirname, "../assets/css")
    ]
  });

  storybookBaseConfig.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [{
      loader: require.resolve('@storybook/addon-storysource/loader'),
      options: {
        prettierConfig: {
          printWidth: 80,
          tabWidth: 2
        }
      }
    }],
    enforce: "pre"
  });

  return storybookBaseConfig;
};
