// @flow
import * as React from "react";
import type { Mark } from "slate";
import defaultRenderMarks from "./renderMarks";

type Props = {
  mark: Mark,
  children: React.Element<*>,
  attributes: ?any
};
type RenderMark = ?(props: Props) => React.Element<*> | void;

export default function createRenderer(
  renderMark: RenderMark = defaultRenderMarks
) {
  return {
    renderMark
  };
}
