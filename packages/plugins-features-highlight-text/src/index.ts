import Renderer from "@vericus/slate-kit-highlight-text-renderer";
import Options, { TypeOptions } from "./options";
import createProps from "./props";
import createChanges from "./changes";
import createUtils from "./utils";

export default function createPlugin(
  pluginOptions: TypeOptions,
  pluginsWrapper
) {
  const options = Options.create(pluginOptions);
  const { type } = options;
  const changes = createChanges(options);
  const utils = createUtils(options);
  const props = createProps(options);
  const plugin: any = {
    options,
    changes,
    utils,
    props
  };
  if (!options.externalRenderer) {
    const { renderers } = Renderer(type);
    plugin.renderers = renderers;
  }
  return plugin;
}
