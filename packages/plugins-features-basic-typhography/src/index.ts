import Renderer from "@vericus/slate-kit-basic-typography-renderer";
import Options, { TypeOptions } from "./options";
import createCommands from "./commands";
import createQueries from "./queries";
import createSchema from "./schemas";
import createRule from "./rules";

export default function createPlugin(
  pluginOptions: TypeOptions,
  pluginsWrapper: any
) {
  const options = new Options(pluginOptions);
  const queries = createQueries(options);
  const commands = createCommands(options);
  const schema = createSchema(options);
  const rules = createRule;
  let plugins: any = [{ options, rules, commands, queries, schema }];
  if (!options.externalRenderer) {
    plugins = [...plugins, { ...Renderer() }];
  }
  return {
    plugins
  };
}
