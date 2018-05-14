// @flow
import Options, { type typeOptions } from "./options";
import CreateUtils from "./utils";
import CreateChanges from "./changes";
import CreateProps from "./props";

function createAlignPlugin(pluginOptions: typeOptions = {}) {
  const opts = new Options(pluginOptions);
  const utils = CreateUtils(opts);
  const changes = CreateChanges(opts);
  const props = CreateProps(opts);
  return { utils, changes, props };
}

export default createAlignPlugin;
