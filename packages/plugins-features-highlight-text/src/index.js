// @flow
import Options, { type typeOptions } from "./options";
import createChanges from "./changes";
import createRenderMark from "./renderMark";
import createUtils from "./utils";
import createSchema from "./schemas";

export default function createPlugin(pluginOptions: typeOptions) {
  const opt = Options.create(pluginOptions);
  const changes = createChanges(opt);
  const renderMark = createRenderMark(opt);
  const schemas = createSchema(opt);
  const utils = createUtils(opt);
  return { changes, utils, renderMark, ...schemas };
}
