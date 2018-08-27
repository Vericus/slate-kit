import Renderer from "@vericus/slate-kit-basic-text-formatting-renderer";
import Options from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createKeyBindings from "./keyBindings";
import createStyle from "./style";
import createRule from "./rules";

export default function createBasicTextFormatPlugin(pluginOptions: any = {}) {
  const options = new Options(pluginOptions);
  const changes = createChanges();
  const utils = createUtils();
  const style = createStyle();
  const rules = createRule;
  let plugins = [
    { options, rules, changes, style, utils },
    ...createKeyBindings(options, changes)
  ];
  if (!options.externalRenderer) {
    plugins = [...plugins, Renderer()];
  }
  return {
    plugins
  };
}
