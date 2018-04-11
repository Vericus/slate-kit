// @flow
import Options, { type typeOptions } from "./options";
import createChanges from "./changes";
import createRenderers from "./renderers";
import createKeyBindings from "./keyBindings";

export default function createBasicTextFormatPlugin(
  pluginOptions: typeOptions = {}
) {
  const opt = new Options(pluginOptions);
  const changes = createChanges();
  const { renderMark } = createRenderers(opt.renderMark);
  return {
    plugins: [{ changes, renderMark }, ...createKeyBindings(opt, changes)]
  };
}
