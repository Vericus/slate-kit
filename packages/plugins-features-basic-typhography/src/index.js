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
  const options = new Options(pluginOptions);
  const utils = createUtils(options);
  const changes = createChanges(options);
  const renderers = createRenderers(options, pluginsWrapper);
  const schemas = createSchema(options);
  return { options, changes, utils, ...renderers, ...schemas };
}
