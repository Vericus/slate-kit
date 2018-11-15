import Register from "@vericus/slate-kit-utils-register-helpers";
import Renderer from "@vericus/slate-kit-basic-typography-renderer";
import Options, { TypeOptions } from "./options";
import createCommands from "./commands";
import createQueries from "./queries";
import createSchema from "./schemas";
import createRule from "./rules";

export default function createPlugin(pluginOptions: Partial<TypeOptions> = {}) {
  const options = Options.create(pluginOptions);
  const { blockTypes, defaultBlock } = options;
  const queries = createQueries(options);
  const commands = createCommands(options);
  const schema = createSchema(options);
  const nodes = {
    ...blockTypes,
    default: defaultBlock
  };
  let plugins: any = [
    Register({ nodes, createRule, ruleOptions: options }),
    { options, commands, queries, schema }
  ];
  if (!options.externalRenderer) {
    plugins = [...plugins, { ...Renderer() }];
  }
  return plugins;
}
