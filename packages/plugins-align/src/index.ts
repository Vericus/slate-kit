import Options, { TypeOptions } from "./options";
import CreateQueries from "./queries";
import CreateCommands from "./commands";
import CreateProps from "./props";
import CreateSchema from "./schemas";
import createStyle from "./style";

function createAlignPlugin(pluginOptions: Partial<TypeOptions> = {}) {
  const options = new Options(pluginOptions);
  const queries = CreateQueries(options);
  const commands = CreateCommands(options);
  const props = CreateProps(options);
  const schema = CreateSchema(options);
  const style = createStyle(options);
  return { options, style, queries, commands, props, schema };
}

export default createAlignPlugin;
