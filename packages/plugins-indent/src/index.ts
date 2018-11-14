import { Editor } from "slate";
import Options, { TypeOptions } from "./options";
import createCommands from "./commands";
import createQueries from "./queries";
import createOnKeyDown from "./onKeyDown";
import createProps from "./props";
import createSchema from "./schemas";
import createStyle from "./style";

function createIndentPlugin(pluginOptions: TypeOptions) {
  const options = new Options(pluginOptions);
  const queries = createQueries(options);
  const commands = createCommands(options);
  const onKeyDown = createOnKeyDown(options);
  const props = createProps(options);
  const schema = createSchema(options);
  const style = createStyle(options);

  function onConstruct(editor: Editor, next) {
    if (editor.registerPropsGetter) {
      editor.registerPropsGetter(props);
    }
    return next();
  }

  return {
    queries,
    onKeyDown: options.withHandlers ? onKeyDown : undefined,
    onConstruct,
    commands,
    options,
    style,
    schema,
    shouldNodeComponentUpdate: (currProps, nextProps) => {
      if (currProps.node.data !== nextProps.node.data) {
        return true;
      }
      return undefined;
    }
  };
}

export default createIndentPlugin;
