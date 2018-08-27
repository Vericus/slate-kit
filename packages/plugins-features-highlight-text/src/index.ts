import Renderer from "@vericus/slate-kit-highlight-text-renderer";
import Options, { TypeOptions } from "./options";
import createChanges from "./changes";
import createUtils from "./utils";

export default function createPlugin(pluginOptions: TypeOptions) {
  const options = Options.create(pluginOptions);
  const changes = createChanges(options);
  const utils = createUtils(options);
  const plugin: any = {
    options,
    changes,
    utils
  };
  if (!options.externalRenderer) {
    const { renderMark } = Renderer(options);
    plugin.renderMark = renderMark;
  }
  return plugin;
}
