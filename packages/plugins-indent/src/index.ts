import { Editor } from "slate";
import Register from "@vericus/slate-kit-utils-register-helpers";
import Options, { TypeOptions } from "./options";
import createCommands from "./commands";
import createQueries from "./queries";
import createOnKeyDown from "./onKeyDown";
import createProps from "./props";
import createSchema from "./schemas";
import createStyle from "./style";

function createIndentPlugin(pluginOptions: Partial<TypeOptions> = {}) {
  const options = new Options(pluginOptions);
  const queries = createQueries(options);
  const commands = createCommands(options);
  const onKeyDown = createOnKeyDown(options);
  const props = createProps(options);
  const schema = createSchema(options);
  const { getData } = createStyle(options);

  return [
    Register({ getData, props }),
    {
      queries,
      onKeyDown: options.withHandlers ? onKeyDown : undefined,
      commands,
      options,
      schema,
      shouldNodeComponentUpdate: (
        currProps,
        nextProps,
        editor: Editor,
        next
      ) => {
        if (currProps.node.data !== nextProps.node.data) {
          return true;
        }
        return next();
      }
    }
  ];
}

export default createIndentPlugin;
