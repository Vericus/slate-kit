// @flow

import Options, { type typeOptions } from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createOnKeyDown from "./onKeyDown";
import createProps from "./props";
import createSchema from "./schemas";
import createStyle from "./style";

function createIndentPlugin(pluginOptions: typeOptions) {
  const options = new Options(pluginOptions);
  const utils = createUtils(options);
  const changes = createChanges(options);
  const onKeyDown = createOnKeyDown(options);
  const props = createProps(options);
  const schemas = createSchema(options);
  const style = createStyle(options);
  return {
    utils,
    props,
    onKeyDown,
    changes,
    options,
    style,
    ...schemas,
    shouldNodeComponentUpdate: (currProps, nextProps) => {
      if (currProps.node.data !== nextProps.node.data) {
        return true;
      }
      return undefined;
    }
  };
}

export default createIndentPlugin;
