import Renderer from "@vericus/slate-kit-highlight-text-renderer";
import Options, { TypeOptions } from "./options";
import createProps from "./props";
import createCommands from "./commands";
import createQueries from "./queries";

export default function createPlugin(
  pluginOptions: TypeOptions,
  pluginsWrapper
) {
  const options = Options.create(pluginOptions);
  const { type } = options;
  const commands = createCommands(options);
  const queries = createQueries(options);
  const props = createProps(options);
  const plugin: any = {
    options,
    commands,
    queries,
    props
  };
  if (!options.externalRenderer) {
    const { renderers } = Renderer(type);
    plugin.renderers = renderers;
  }
  return plugin;
}
