// @flow

import Options, { type typeOptions } from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createOnKeyDown from "./onKeyDown";
import createProps from "./props";
import createSchema from "./schemas";

function createIndentPlugin(pluginOptions: typeOptions, pluginsWrapper: any) {
  const options = new Options(pluginOptions);
  const utils = createUtils(options);
  const changes = createChanges(options);
  const onKeyDown = createOnKeyDown(options);
  const props = createProps(options);
  const schemas = createSchema(options);
  return {
    utils,
    props,
    onKeyDown,
    changes,
    options,
    ...schemas,
    shouldNodeComponentUpdate: (currProps, nextProps) => {
      if (currProps.node.data !== nextProps.node.data) {
        return true;
      }
      if (
        pluginsWrapper.getProps(currProps.node) !==
        pluginsWrapper.getProps(nextProps.node)
      ) {
        return true;
      }
      return undefined;
    }
  };
}

export default createIndentPlugin;
