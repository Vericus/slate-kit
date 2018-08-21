import Renderer from "@vericus/slate-kit-highlight-text-renderer";
import Options, { TypeOptions } from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createSchema from "./schemas";

export default function createPlugin(pluginOptions: TypeOptions) {
  const options = Options.create(pluginOptions);
  const changes = createChanges(options);
  const schemas = createSchema();
  const utils = createUtils(options);
  const plugin: any = {
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
