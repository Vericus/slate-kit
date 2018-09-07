import renderMark, { Props } from "./renderMark";
import PluginsWrapper from "@vericus/slate-kit-plugins-wrapper";

export function createRenderer(type: string) {
  return {
    renderers: renderMark(type)
  };
}

export default createRenderer;
