// @flow
import Options from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createRenderers from "./renderers";
import createKeyBindings from "./keyBindings";
import createSchema from "./schemas";

export default function createBasicTextFormatPlugin(pluginOptions: any = {}) {
  const options = new Options(pluginOptions);
  const changes = createChanges();
  const utils = createUtils();
  const schemas = createSchema(options);
  const { renderMark } = createRenderers(options.renderMark);
  return {
    plugins: [
      { options, changes, utils, renderMark, ...schemas },
      ...createKeyBindings(options, changes)
    ]
  };
}
