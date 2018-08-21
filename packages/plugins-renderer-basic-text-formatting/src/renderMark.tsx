import * as React from "react";
import { Mark } from "slate";
import SlateTypes from "slate-prop-types";

export interface Props {
  mark: Mark;
  children: JSX.Element;
  attributes: any;
}

const defaultStyle = {
  textDecoration: "inherit",
  textDecorationColor: "inherit"
};

const renderMark: React.SFC<Props> = ({ children, attributes }) => {
  return <span {...attributes}>{children}</span>;
};

renderMark.propTypes = SlateTypes.Mark;

export function renderBold(props: Props) {
  return renderMark({
    ...props,
    attributes: {
      ...props.attributes,
      style: { ...defaultStyle, fontWeight: "bold" }
    }
  });
}

export function renderItalic(props: Props) {
  return renderMark({
    ...props,
    attributes: {
      ...props.attributes,
      style: { ...defaultStyle, fontStyle: "italic" }
    }
  });
}

export function renderUnderline(props: Props) {
  return renderMark({
    ...props,
    attributes: {
      ...props.attributes,
      style: { ...defaultStyle, textDecoration: "underline" }
    }
  });
}

export function renderStrikethrough(props: Props) {
  return renderMark({
    ...props,
    attributes: {
      ...props.attributes,
      style: { ...defaultStyle, textDecoration: "line-through" }
    }
  });
}

export default function createRenderMark() {
  return (props: Props) => {
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
  };
}
