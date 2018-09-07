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

export function bold(props: Props) {
  return renderMark({
    ...props,
    attributes: {
      ...props.attributes,
      style: { ...defaultStyle, fontWeight: "bold" }
    }
  });
}

export function italic(props: Props) {
  return renderMark({
    ...props,
    attributes: {
      ...props.attributes,
      style: { ...defaultStyle, fontStyle: "italic" }
    }
  });
}

export function underline(props: Props) {
  return renderMark({
    ...props,
    attributes: {
      ...props.attributes,
      style: { ...defaultStyle, textDecoration: "underline" }
    }
  });
}

export function strikethrough(props: Props) {
  return renderMark({
    ...props,
    attributes: {
      ...props.attributes,
      style: { ...defaultStyle, textDecoration: "line-through" }
    }
  });
}

export default function createRenderMark() {
  return {
    marks: {
      bold,
      italic,
      underline,
      strikethrough
    }
  };
}
