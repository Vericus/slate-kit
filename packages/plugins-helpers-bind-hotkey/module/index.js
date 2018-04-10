import Options from "./options";
import createOnKeyDown from "./onKeyDown";

function createHotKeyPlugin(pluginOptions) {
  var opts = new Options(pluginOptions);
  var onKeyDown = createOnKeyDown(opts);
  return {
    onKeyDown: onKeyDown
  };
}

export default createHotKeyPlugin;
