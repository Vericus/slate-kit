// @flow
import Options from "./options";
import CreateUtils from "./utils";
import CreateChanges from "./changes";
import CreateProps from "./props";
import CreateSchema from "./schemas";

function createAlignPlugin(pluginOptions: any = {}) {
  const options = new Options(pluginOptions);
  const utils = CreateUtils(options);
  const changes = CreateChanges(options);
  const props = CreateProps(options);
  const schemas = CreateSchema(options);
  return { options, utils, changes, props, ...schemas };
}

export default createAlignPlugin;
