import Renderer from "@vericus/slate-kit-basic-text-formatting-renderer";
import PluginsWrapper from "@vericus/slate-kit-plugins-wrapper";
import Options, { TypeOptions } from "./options";
import createCommands from "./commands";
import createQueries from "./queries";
import createKeyBindings from "./keyBindings";
import createStyle from "./style";
import createRule from "./rules";

export default function createBasicTextFormatPlugin(
  pluginOptions: Partial<TypeOptions>,
  pluginsWrapper?: PluginsWrapper
) {
  const options = Options.create(pluginOptions);
  const commands = createCommands(options);
  const queries = createQueries(options);
  const style = createStyle(options);
  const rules = createRule;
  const { externalRenderer, withHandlers } = options;
  let plugins = [
    {
      options,
      commands,
      style,
      queries,
      rules: withHandlers ? rules : undefined
    },
    ...(withHandlers ? createKeyBindings(options) : [])
  ];
  if (!externalRenderer || pluginsWrapper) {
    plugins = [...plugins, Renderer()];
  }
  return {
    plugins
  };
}
