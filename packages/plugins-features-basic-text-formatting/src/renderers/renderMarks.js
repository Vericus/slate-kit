// @flow
import React, { type Element } from "react";
import Types from "slate-prop-types";
import type { Mark } from "slate";

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  mark: Mark,
  children: Element<*>,
  attributes: ?any
};

const defaultStyle = {
  textDecoration: "inherit",
  textDecorationColor: "inherit"
};

function renderMark({ children, attributes }: Props) {
  return <span {...attributes}>{children}</span>;
}

export function renderBold(props: Props) {
  return renderMark({
    ...props,
    attributes: { style: { ...defaultStyle, fontWeight: "bold" } }
  });
}

export function renderItalic(props: Props) {
  return renderMark({
    ...props,
    attributes: { style: { ...defaultStyle, fontStyle: "italic" } }
  });
}

export function renderUnderline(props: Props) {
  return renderMark({
    ...props,
    attributes: { style: { ...defaultStyle, textDecoration: "underline" } }
  });
}

export function renderStrikethrough(props: Props) {
  return renderMark({
    ...props,
    attributes: { style: { ...defaultStyle, textDecoration: "line-through" } }
  });
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
