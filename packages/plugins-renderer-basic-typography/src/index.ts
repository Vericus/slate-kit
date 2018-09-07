import createRenderNode, {
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  Paragraph,
  Blockquote,
  Props
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
