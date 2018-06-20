// @flow
import Renderer from "@vericus/slate-kit-basic-typography-renderer";
import Options, { type typeOptions } from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createSchema from "./schemas";
import createRule from "./rules";

export default function createPlugin(
  pluginOptions: typeOptions,
  pluginsWrapper: any
) {
  const options = new Options(pluginOptions);
  const utils = createUtils(options);
  const changes = createChanges(options);
  const schemas = createSchema(options);
  const rules = createRule;
  let plugins = [{ options, rules, changes, utils, ...schemas }];
  if (!options.externalRenderer) {
    plugins = [...plugins, { ...Renderer(pluginOptions, pluginsWrapper) }];
  }
  return {
    plugins
  };
}
