import createRenderMark, { Props } from "./renderMark";

export default function createRenderer() {
  return {
    renderers: createRenderMark()
  };
}
