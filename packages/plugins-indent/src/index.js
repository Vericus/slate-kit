// @flow

import Options, { type typeOptions } from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createOnKeyDown from "./onKeyDown";
import createProps from "./props";

function createIndentPlugin(pluginOptions: typeOptions, pluginsWrapper) {
  const opts = new Options(pluginOptions);
  const utils = createUtils(opts);
  const changes = createChanges(opts, utils);
  const onKeyDown = createOnKeyDown(opts, changes, utils);
  const props = createProps(opts, utils);
  return {
    utils,
    props,
    onKeyDown,
    changes,
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
    }
  };
}

export default createIndentPlugin;
