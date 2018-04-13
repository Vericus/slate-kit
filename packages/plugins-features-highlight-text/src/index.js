// @flow
import Options, { type typeOptions } from "./options";
import createChanges from "./changes";
import createRenderMark from "./renderMark";

export default function createPlugin(pluginOptions: typeOptions) {
  const opt = Options.create(pluginOptions);
  const changes = createChanges(opt);
  const renderMark = createRenderMark(opt);
  return { changes, renderMark };
}
