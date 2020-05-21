import * as React from "react";
import Register from "@vericus/slate-kit-utils-register-helpers";
import { Mark, Plugin } from "slate";
import SlateTypes from "slate-prop-types";

export interface Props {
  mark: Mark;
  children: JSX.Element;
  attributes: any;
  className?: string;
}

const defaultStyle = {
  textDecoration: "inherit",
  textDecorationColor: "inherit",
};

const renderMark: React.SFC<Props> = ({ children, attributes, className }) => {
  return (
    <span {...attributes} className={className}>
      {children}
    </span>
  );
};

renderMark.propTypes = SlateTypes.Mark;

export function bold(props: Props) {
  return renderMark({
    ...props,
    attributes: {
      ...props.attributes,
      style: { ...defaultStyle, fontWeight: "bold" },
    },
  });
}

export function italic(props: Props) {
  return renderMark({
    ...props,
    attributes: {
      ...props.attributes,
      style: { ...defaultStyle, fontStyle: "italic" },
    },
  });
}

export function underline(props: Props) {
  return renderMark({
    ...props,
    attributes: {
      ...props.attributes,
      style: { ...defaultStyle, textDecoration: "underline" },
    },
  });
}

export function strikethrough(props: Props) {
  return renderMark({
    ...props,
    attributes: {
      ...props.attributes,
      style: { ...defaultStyle, textDecoration: "line-through" },
    },
  });
}

export default function createRenderMark(): Plugin {
  const marksRenderer = {
    bold,
    italic,
    underline,
    strikethrough,
  };
  return Register({ marksRenderer });
}
