import Options, { TypeOptions } from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createOnKeyDown from "./onKeyDown";
import createProps from "./props";
import createSchema from "./schemas";
import createStyle from "./style";

function createIndentPlugin(pluginOptions: TypeOptions) {
  const options = new Options(pluginOptions);
  const utils = createUtils(options);
  const changes = createChanges(options);
  const onKeyDown = createOnKeyDown(options);
  const props = createProps(options);
  const schema = createSchema(options);
  const style = createStyle(options);
  return {
    utils,
    props,
    onKeyDown: options.withHandlers ? onKeyDown : undefined,
    changes,
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
