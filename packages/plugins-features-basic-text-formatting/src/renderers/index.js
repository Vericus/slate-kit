// @flow
import * as React from "react";
import type { Mark } from "slate";
import defaultRenderMarks from "./renderMarks";

type Props = {
  mark: Mark,
  children: React.Node | void,
  style?: ?any
};
type RenderMark = ?(props: Props) => React.Element<any> | React.Node | void;

export default function createRenderer(
  renderMark: RenderMark = defaultRenderMarks
) {
  return {
    renderMark
  };
}
