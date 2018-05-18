// @flow
import Options, { type typeOptions } from "./options";
import createChanges from "./changes";
import createRenderMark from "./renderMark";
import createUtils from "./utils";
import createSchema from "./schemas";

export default function createPlugin(pluginOptions: typeOptions) {
  const options = Options.create(pluginOptions);
  const changes = createChanges(options);
  const renderMark = createRenderMark(options);
  const schemas = createSchema(options);
  const utils = createUtils(options);
  return { options, changes, utils, renderMark, ...schemas };
}
