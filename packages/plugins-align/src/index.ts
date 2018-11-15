import Register from "@vericus/slate-kit-utils-register-helpers";
import Options, { TypeOptions } from "./options";
import CreateQueries from "./queries";
import CreateCommands from "./commands";
import CreateProps from "./props";
import CreateSchema from "./schemas";
import createStyle from "./style";

function createAlignPlugin(pluginOptions: Partial<TypeOptions> = {}) {
  const options = Options.create(pluginOptions);
  const queries = CreateQueries(options);
  const commands = CreateCommands(options);
  const props = CreateProps(options);
  const schema = CreateSchema(options);
  const { getData } = createStyle(options);

  return [Register({ props, getData }), { options, queries, commands, schema }];
}

export default createAlignPlugin;
