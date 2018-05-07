const chalk = require("chalk");

const capitalize = require("./utils/capitalize");
const stripPrefix = require("./utils/strip-prefix");

module.exports = {
  module: {
    argument: {
      desc: "The name of your module without scope (on npm)",
      type: String,
      required: false
    },
    prompt: {
      name: "module",
      message: "What should the module name be without scope(on npm)?",
      type: "input",
      validate: name => name.includes("slate-kit")
    }
  },
  // the human-readable title of the module
  title: {
    option: {
      desc: "The module's human-readable title",
      type: String,
      alias: "t"
    },
    prompt: {
      message: "What should the title be (for humans)?",
      type: "input",
      default: ({ module }) =>
        capitalize(stripPrefix(module || this.options.module))
    }
  },

  description: {
    option: { type: String },
    prompt: {
      message: [
        "Describe your module in a single sentence.",
        chalk.yellow("(This will go into the package.json and README.md.)")
      ].join("\n"),
      type: "input",
      default: "TODO: fill in this description later"
    }
  },

  path: {
    argument: {
      desc: "The path where you want to create the module",
      type: String,
      required: false
    },
    prompt: {
      name: "path",
      message: "Where should the module be created at?",
      type: "input"
    }
  }
};
