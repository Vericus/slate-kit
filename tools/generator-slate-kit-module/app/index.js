const chalk = require("chalk");
const path = require("path");
const Generator = require("yeoman-generator");

const OPTIONS = require("./options");

module.exports = class SlateKitModule extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // initialize positional arguments and option flags
    Object.entries(OPTIONS).forEach(([name, val]) => {
      if (val.argument) {
        this.argument(name, Object.assign(val.argument, { name }));
      } else if (val.option) {
        const option = Object.assign(val.option, { name });
        if (name.includes("_")) {
          const alias = name.replace(/_/g, "-");
          option.alias = option.alias ? [alias].concat(option.alias) : alias;
        }
        this.option(name, option);
      }
    });
  }

  prompting() {
    if (this.options.module) {
      this.log(
        "Okay, let's get you started with %s...",
        chalk.green(this.options.module)
      );
    }

    // filter out options without prompts, and which already
    // have options set, then add back the "name" key to each
    const prompts = Object.entries(OPTIONS)
      .filter(
        ([name, { prompt }]) =>
          prompt &&
          (prompt.when === true || typeof this.options[name] === "undefined")
      )
      .map(([name, { prompt }]) => {
        // bind functions to the generator as `this`
        Object.keys(prompt).forEach(key => {
          if (typeof prompt[key] === "function") {
            prompt[key] = prompt[key].bind(this);
          }
        });
        return Object.assign(prompt, { name });
      });

    // remove prompts for which arguments were already provided
    return this.prompt(prompts).then(answers => {
      Object.assign(this.options, answers);
    });
  }

  paths() {
    this.basePath = this.destinationPath(this.options.path);
  }

  writing() {
    this.log("creating: %s", chalk.green(this.basePath));
    const data = {};
    Object.assign(
      data,
      Object.entries(OPTIONS)
        .map(([name, value]) => [name, this.options[name]])
        .reduce((acc, [name, value]) => {
          acc[name] = value;
          return acc;
        }, {})
    );
    // copy the whole directory with each file treated as
    // an EJS template
    this.fs.copyTpl(
      this.templatePath("files/**"),
      this.basePath,
      data,
      undefined,
      {
        globOptions: { dot: true }
      }
    );
  }
};
