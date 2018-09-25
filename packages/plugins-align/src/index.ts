import Options, { TypeOptions } from "./options";
import CreateUtils, { AlignUtils } from "./utils";
import CreateChanges from "./changes";
import CreateProps from "./props";
import CreateSchema from "./schemas";
import createStyle from "./style";

function createAlignPlugin(pluginOptions: Partial<TypeOptions> = {}) {
  const options = new Options(pluginOptions);
  const utils = CreateUtils(options);
  const changes = CreateChanges(options);
  const props = CreateProps(options);
  const schema = CreateSchema(options);
  const style = createStyle(options);
  return { options, style, utils, changes, props, schema };
}

export default createAlignPlugin;
export { TypeOptions, AlignUtils };
