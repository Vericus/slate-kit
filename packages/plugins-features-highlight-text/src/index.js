// @flow
import Renderer from "@vericus/slate-kit-highlight-text-renderer";
import Options, { type typeOptions } from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createSchema from "./schemas";

export default function createPlugin(pluginOptions: typeOptions) {
  const options = Options.create(pluginOptions);
  const changes = createChanges(options);
  const schemas = createSchema();
  const utils = createUtils(options);
  const plugin = {
    options,
    changes,
    utils,
    ...schemas
  };
  if (!options.externalRenderer) {
    const { renderMark } = Renderer(options);
    plugin.renderMark = renderMark;
  }
  return plugin;
}
