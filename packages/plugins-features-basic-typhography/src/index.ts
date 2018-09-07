import Renderer from "@vericus/slate-kit-basic-typography-renderer";
import Options, { TypeOptions } from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createSchema from "./schemas";
import createRule from "./rules";

export default function createPlugin(
  pluginOptions: TypeOptions,
  pluginsWrapper: any
) {
  const options = new Options(pluginOptions);
  const utils = createUtils(options);
  const changes = createChanges(options);
  const schema = createSchema(options);
  const rules = createRule;
  let plugins: any = [{ options, rules, changes, utils, schema }];
  if (!options.externalRenderer) {
    plugins = [...plugins, { ...Renderer() }];
  }
  return {
    plugins
  };
}
