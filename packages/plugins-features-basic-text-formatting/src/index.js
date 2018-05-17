// @flow
import Options from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createRenderers from "./renderers";
import createKeyBindings from "./keyBindings";
import createSchema from "./schemas";

export default function createBasicTextFormatPlugin(pluginOptions: any = {}) {
  const opt = new Options(pluginOptions);
  const changes = createChanges();
  const utils = createUtils();
  const schemas = createSchema(opt);
  const { renderMark } = createRenderers(opt.renderMark);
  return {
    plugins: [
      { changes, utils, renderMark, ...schemas },
      ...createKeyBindings(opt, changes)
    ]
  };
}
