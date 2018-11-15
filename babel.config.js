module.exports = function(api) {
  let presets = [];
  let plugins = [];
  if (api.env("webpack")) {
    presets = [
      [
        "@babel/env",
        {
          modules: false
        }
      ],
      "@babel/react"
    ];
    plugins = ["@babel/plugin-transform-runtime"];
  } else if (api.env("test")) {
    presets = [
      [
        "@babel/env",
        {
          modules: "commonjs",
          useBuiltIns: "usage",
          debug: false
        }
      ],
      "@babel/react"
    ];
    plugins = [
      "@babel/plugin-transform-runtime",
      "@babel/transform-modules-commonjs",
      "@babel/plugin-proposal-function-bind",
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-logical-assignment-operators",
      [
        "@babel/plugin-proposal-optional-chaining",
        {
          loose: false
        }
      ],
      [
        "@babel/plugin-proposal-pipeline-operator",
        {
          proposal: "minimal"
        }
      ],
      [
        "@babel/plugin-proposal-nullish-coalescing-operator",
        {
          loose: false
        }
      ],
      "@babel/plugin-proposal-do-expressions",
      [
        "@babel/plugin-proposal-decorators",
        {
          legacy: true
        }
      ],
      "@babel/plugin-proposal-function-sent",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-numeric-separator",
      "@babel/plugin-proposal-throw-expressions",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-import-meta",
      [
        "@babel/plugin-proposal-class-properties",
        {
          loose: false
        }
      ],
      "@babel/plugin-proposal-json-strings"
    ];
  } else if (api.env("build")) {
    presets = ["@babel/react", "@babel/env"];
    plugins = [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread"
    ];
  } else if (api.env("gh-pages")) {
    presets = ["@babel/env", "@babel/react"];
    plugins = [
      [
        "@babel/plugin-transform-classes",
        {
          globals: ["Error", "Array"]
        }
      ],
      "@babel/plugin-transform-runtime"
    ];
  } else {
    presets = [
      [
        "@babel/env",
        {
          modules: false
        }
      ],
      "@babel/react"
    ];
  }

  return {
    presets,
    plugins
  };
};
