import renderMark from "./renderMark";

export function createRenderer(type: string) {
  return {
    renderers: renderMark(type)
  };
}

export default createRenderer;
