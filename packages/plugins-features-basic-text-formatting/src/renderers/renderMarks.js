// @flow
import * as React from "react";
import Types from "slate-prop-types";
import type { Mark } from "slate";

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  mark: Mark,
  children: React.Node | void,
  style: ?any
};

function renderMark({ children, style }: Props) {
  return <span style={style}>{children}</span>;
}

export function renderBold(props: Props) {
  return renderMark({ ...props, style: { fontWeight: "bold" } });
}

export function renderItalic(props: Props) {
  return renderMark({ ...props, style: { fontStyle: "italic" } });
}

export function renderUnderline(props: Props) {
  return renderMark({ ...props, style: { textDecoration: "underline" } });
}

export function renderStrikethrough(props: Props) {
  return renderMark({ ...props, style: { textDecoration: "line-through" } });
}

export default function renderMarks(props: Props) {
  switch (props.mark.type) {
    case "bold":
      return renderBold(props);
    case "italic":
      return renderItalic(props);
    case "underline":
      return renderUnderline(props);
    case "strikethrough":
      return renderStrikethrough(props);
    // no default
  }
  return undefined;
}

renderBold.propTypes = Types.Mark;
renderItalic.propTypes = Types.Mark;
renderUnderline.propTypes = Types.Mark;
renderStrikethrough.propTypes = Types.Mark;
renderMark.propTypes = Types.Mark;
