const path = require("path");

module.exports = {
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
      "eslint-import-resolver-lerna": {
        packages: path.resolve(__dirname, "packages")
      }
    }
  },
  root: true,
  extends: ["@vericus/vericus-base"],
  env: {
    es6: true,
    browser: true
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".tsx"] }],
    "react/destructuring-assignment": 0,
    "prettier/prettier": "error",
    "jsx-a11y/click-events-have-key-events": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { args: "after-used", argsIgnorePattern: "^_" }
    ],
    "no-unused-vars": ["warn", { args: "after-used", argsIgnorePattern: "^_" }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/test/**/*.js",
          "**/test/**/*.ts",
          "**/test/**/*.tsx"
        ],
        peerDependencies: true
      }
    ],
    "import/prefer-default-export": false,
    "react/prop-types": 0,
    "react/button-has-type": 0
  },
  overrides: [
    {
      files: ["packages/**/test/**/*.js"],
      env: { jest: true },
      parser: "babel-eslint"
    },
    {
      files: ["packages/**/test/**/*.ts", "packages/**/test/**/*.tsx"],
      env: { jest: true }
    },
    {
      files: ["stories/**/*.js"],
      parser: "babel-eslint",
      rules: {
        "import/no-extraneous-dependencies": 0
      }
    }
  ]
};
