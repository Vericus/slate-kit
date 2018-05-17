// @flow
import Options, { type typeOptions } from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createRenderers from "./renderers";
import createSchema from "./schemas";

export default function createPlugin(
  pluginOptions: typeOptions,
  pluginsWrapper: any
) {
  const opt = new Options(pluginOptions);
  const utils = createUtils(opt);
  const changes = createChanges(opt);
  const renderers = createRenderers(opt, pluginsWrapper);
  const schemas = createSchema(opt);
  return { changes, utils, ...renderers, ...schemas };
}
