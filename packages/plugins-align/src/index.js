// @flow
import Options, { type typeOptions } from "./options";
import CreateUtils from "./utils";
import CreateChanges from "./changes";
import CreateProps from "./props";
import CreateSchema from "./schemas";

function createAlignPlugin(pluginOptions: typeOptions = {}) {
  const opts = new Options(pluginOptions);
  const utils = CreateUtils(opts);
  const changes = CreateChanges(opts);
  const props = CreateProps(opts);
  const schemas = CreateSchema(opts);
  return { utils, changes, props, ...schemas };
}

export default createAlignPlugin;
