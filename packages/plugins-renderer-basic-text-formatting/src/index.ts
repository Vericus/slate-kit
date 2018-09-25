import createRenderMark, * as RenderMark from "./renderMark";

export default function createRenderer() {
  return {
    renderers: createRenderMark()
  };
}
