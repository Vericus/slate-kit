// @flow
import Options from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createRenderers from "./renderers";
import createKeyBindings from "./keyBindings";
import createSchema from "./schemas";
import createStyle from "./style";
import createRule from "./rules";

export default function createBasicTextFormatPlugin(pluginOptions: any = {}) {
  const options = new Options(pluginOptions);
  const changes = createChanges();
  const utils = createUtils();
  const schemas = createSchema(options);
  const style = createStyle();
  const rules = createRule;
  const { renderMark } = createRenderers(options.renderMark);
  return {
    plugins: [
      { options, rules, changes, style, utils, renderMark, ...schemas },
      ...createKeyBindings(options, changes)
    ]
  };
}
