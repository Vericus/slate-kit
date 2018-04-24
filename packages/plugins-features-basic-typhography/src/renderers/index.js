// @flow
import type { typeOptions } from "../options";
import defaultRenderNode, {
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  Paragraph
} from "./renderNode";

export function createRenderer(opts: typeOptions) {
  const { externalRenderer } = opts;
  return {
    renderNode: externalRenderer ? undefined : defaultRenderNode
  };
}

export {
  createRenderer as default,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  Paragraph
};
