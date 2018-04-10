import babel from "rollup-plugin-babel";
import builtins from "rollup-plugin-node-builtins";
import commonjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";
import { startCase } from "lodash";

/**
 * Return a Rollup configuration for a `pkg` with `env` and `target`.
 *
 * @param {Object} pkg
 * @param {String} env
 * @param {String} format
 * @return {Object}
 */

function configure(pkg, location, env, target) {
  const isProd = env === "production";
  const isUmd = target === "umd";
  const isModule = target === "module";
  const input = `${location}/src/index.js`;
  const deps = []
    .concat(pkg.dependencies ? Object.keys(pkg.dependencies) : [])
    .concat(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []);

  const plugins = [
    // Allow Rollup to resolve modules from `node_modules`, since it only
    // resolves local modules by default.
    resolve({
      browser: true
    }),

    // Allow Rollup to resolve CommonJS modules, since it only resolves ES2015
    // modules by default.
    isUmd &&
      commonjs({
        exclude: [`${location}/src/**`],
        // HACK: Sometimes the CommonJS plugin can't identify named exports, so
        // we have to manually specify named exports here for them to work.
        // https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
        namedExports: {
          esrever: ["reverse"],
          immutable: [
            "List",
            "Map",
            "Record",
            "OrderedSet",
            "Set",
            "Stack",
            "is"
          ],
          "react-dom": ["findDOMNode"],
          "react-dom/server": ["renderToStaticMarkup"]
        }
      }),

    // Convert JSON imports to ES6 modules.
    json(),

    // Replace `process.env.NODE_ENV` with its value, which enables some modules
    // like React and Slate to use their production variant.
    replace({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),

    // Register Node.js builtins for browserify compatibility.
    builtins(),

    // Use Babel to transpile the result, limiting it to the source code.
    babel({
      include: [`${location}/src/**`],
      plugins: ["external-helpers"]
    }),

    // Register Node.js globals for browserify compatibility.
    globals(),

    // Only minify the output in production, since it is very slow. And only
    // for UMD builds, since modules will be bundled by the consumer.
    isUmd && isProd && uglify()
  ].filter(Boolean);

  if (isUmd) {
    return {
      plugins,
      input,
      output: {
        format: "umd",
        file: `${location}/${isProd ? pkg.umdMin : pkg.umd}`,
        exports: "named",
        name: startCase(pkg.name)
          .replace(/@vericus/g, "")
          .replace(/ /g, ""),
        globals: pkg.umdGlobals
      },
      external: Object.keys(pkg.umdGlobals || {})
    };
  }

  if (isModule) {
    return {
      plugins,
      input,
      output: [
        {
          file: `${location}/${pkg.module}`,
          format: "es",
          sourcemap: true
        },
        {
          file: `${location}/${pkg.main}`,
          format: "cjs",
          exports: "named",
          sourcemap: true
        }
      ],
      // We need to explicitly state which modules are external, meaning that
      // they are present at runtime. In the case of non-UMD configs, this means
      // all non-Slate packages.
      external: id => !!deps.find(dep => dep === id || id.startsWith(`${dep}/`))
    };
  }
  return undefined;
}

/**
 * Return a Rollup configuration for a `pkg`.
 *
 * @return {Array}
 */

function factory(pkg, location) {
  const isProd = process.env.NODE_ENV === "production";
  return [
    configure(pkg, location, "development", "module"),
    isProd && configure(pkg, location, "development", "umd"),
    isProd && configure(pkg, location, "production", "umd")
  ].filter(Boolean);
}

/**
 * Export.
 *
 * @type {Function}
 */

export default factory;
