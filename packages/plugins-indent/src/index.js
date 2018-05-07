// @flow

import Options, { type typeOptions } from "./options";
import createChanges from "./changes";
import createOnKeyDown from "./onKeyDown";

function createIndentPlugin(pluginOptions: typeOptions) {
  const opts = new Options(pluginOptions);
  const changes = createChanges(opts);
  const onKeyDown = createOnKeyDown(opts, changes);
  return {
    onKeyDown,
    changes,
    shouldNodeComponentUpdate: (props, nextProps) => {
      if (props.node.data !== nextProps.node.data) {
        return true;
      }
    }
  };
}

export default createIndentPlugin;
