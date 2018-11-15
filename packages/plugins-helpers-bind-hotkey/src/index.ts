import Options, { TypeOptions } from "./options";
import createOnKeyDown from "./onKeyDown";

function createHotKeyPlugin(pluginOptions: Partial<TypeOptions> = {}) {
  const options = new Options(pluginOptions);
  const onKeyDown = createOnKeyDown(options);
  return {
    onKeyDown
  };
}

export default createHotKeyPlugin;
