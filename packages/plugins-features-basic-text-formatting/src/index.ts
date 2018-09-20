import Renderer from "@vericus/slate-kit-basic-text-formatting-renderer";
import PluginsWrapper from "@vericus/slate-kit-plugins-wrapper";
import Options, { TypeOptions } from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createKeyBindings from "./keyBindings";
import createStyle from "./style";
import createRule from "./rules";

export default function createBasicTextFormatPlugin(
  pluginOptions: Partial<TypeOptions>,
  pluginsWrapper?: PluginsWrapper
) {
  const options = new Options(pluginOptions);
  const changes = createChanges(options);
  const utils = createUtils(options);
  const style = createStyle(options);
  const rules = createRule;
  const { externalRenderer, withHandlers } = options;
  let plugins = [
    { options, changes, style, utils, rules: withHandlers ? rules : undefined },
    ...(withHandlers ? createKeyBindings(options, changes) : [])
  ];
  if (!externalRenderer || pluginsWrapper) {
    plugins = [...plugins, Renderer()];
  }
  return {
    plugins
  };
}
