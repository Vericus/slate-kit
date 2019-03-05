const path = require("path");

module.exports = {
  settings: {
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
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
    "prettier/standard"
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "prettier",
    "standard"
  ],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    browser: true
  },
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".tsx"] }],
    "react/destructuring-assignment": 0,
    "prettier/prettier": "error",
    "standard/object-curly-even-spacing": [2, "either"],
    "standard/array-bracket-even-spacing": [2, "either"],
    "standard/computed-property-even-spacing": [2, "even"],
    "standard/no-callback-literal": [2, ["cb", "callback"]],
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
      files: ["packages/**/src/**/*.ts", "packages/**/src/**/*.tsx"]
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
