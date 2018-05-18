// @flow

import Options, { type typeOptions } from "./options";
import createOnKeyDown from "./onKeyDown";

function createHotKeyPlugin(pluginOptions: typeOptions) {
  const options = new Options(pluginOptions);
  const onKeyDown = createOnKeyDown(options);
  return {
    onKeyDown,
    options
  };
}

export default createHotKeyPlugin;
