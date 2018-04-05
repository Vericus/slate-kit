// @flow

import Options, { type typeOptions } from "./options";
import createOnKeyDown from "./onKeyDown";

function createHotKeyPlugin(pluginOptions: typeOptions) {
  const opts = new Options(pluginOptions);
  const onKeyDown = createOnKeyDown(opts);
  return {
    onKeyDown
  };
}

export default createHotKeyPlugin;
