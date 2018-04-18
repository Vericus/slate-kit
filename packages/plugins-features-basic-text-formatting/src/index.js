// @flow
import Options, { type typeOptions } from "./options";
import createChanges from "./changes";
import createUtils from "./utils";
import createRenderers from "./renderers";
import createKeyBindings from "./keyBindings";

export default function createBasicTextFormatPlugin(
  pluginOptions: typeOptions = {}
) {
  const opt = new Options(pluginOptions);
  const changes = createChanges();
  const utils = createUtils();
  const { renderMark } = createRenderers(opt.renderMark);
  return {
    plugins: [
      { changes, utils, renderMark },
      ...createKeyBindings(opt, changes)
    ]
  };
}
