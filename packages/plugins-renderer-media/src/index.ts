import createRenderer from "./renderer";

export function createMediaRenderer(opts) {
  return {
    renderers: createRenderer(opts)
  };
}

export default createMediaRenderer;
