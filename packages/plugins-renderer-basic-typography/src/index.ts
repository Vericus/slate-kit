import createRenderNode, {
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  Paragraph,
  Blockquote
} from "./renderNode";

export function createRenderer() {
  return {
    renderers: createRenderNode()
  };
}

export {
  createRenderer as default,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  Paragraph,
  Blockquote
};
