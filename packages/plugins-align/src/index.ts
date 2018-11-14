import { Editor } from "slate";
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

  function onConstruct(editor: Editor, next) {
    if (editor.registerPropsGetter) {
      editor.registerPropsGetter(props);
    }
    if (editor.registerDataGetter) {
      editor.registerDataGetter(getData);
    }
    return next();
  }

  return { options, onConstruct, queries, commands, schema };
}

export default createAlignPlugin;
