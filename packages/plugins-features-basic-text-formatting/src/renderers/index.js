// @flow
import * as React from "react";
import type { Mark } from "slate";
import defaultRenderMarks, {
  renderStrikethrough,
  renderBold,
  renderItalic,
  renderUnderline
} from "./renderMarks";

type Props = {
  mark: Mark,
  children: React.Element<*>,
  attributes: ?any
};
type RenderMark = ?(props: Props) => React.Element<*> | void;

function createRenderer(renderMark: RenderMark = defaultRenderMarks) {
  return {
    renderMark
  };
}

export {
  createRenderer as default,
  renderStrikethrough,
  renderBold,
  renderItalic,
  renderUnderline
};
