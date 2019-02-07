import Register from "@vericus/slate-kit-utils-register-helpers";
import { Plugin } from "slate";
import Options, { TypeOptions } from "./options";
import createCommands from "./commands";
import createQueries from "./queries";
import createSchema from "./schemas";
import createRule from "./rules";

export default function createPlugin(
  pluginOptions: Partial<TypeOptions> = {}
): Plugin[] {
  const options = Options.create(pluginOptions);
  const { blockTypes, defaultBlock, renderer } = options;
  const queries = createQueries(options);
  const commands = createCommands(options);
  const schema = createSchema(options);
  const nodes = {
    ...blockTypes,
    default: defaultBlock
  };
  let plugins: Plugin[] = [
    Register({ nodes, createRule, options }),
    { commands, queries, schema }
  ];
  if (renderer) {
    const rendererPlugins = renderer(options);
    if (Array.isArray(rendererPlugins)) {
      plugins = [...plugins, ...rendererPlugins];
    } else {
      plugins = [...plugins, rendererPlugins];
    }
  }
  return plugins;
}
