import Options, { TypeOptions } from "./options";
import createOnKeyDown from "./onKeyDown";

function createHotKeyPlugin(pluginOptions: TypeOptions) {
  const options = new Options(pluginOptions);
  const onKeyDown = createOnKeyDown(options);
  return {
    onKeyDown,
    options
  };
}

export default createHotKeyPlugin;
