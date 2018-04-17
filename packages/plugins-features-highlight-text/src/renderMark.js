// @flow
import React, { type Element } from "react";
import { type Mark } from "slate";
import tinycolor from "tinycolor2";
import type { typeOptions } from "./options";

const defaultStyle = {
  textDecoration: "inherit",
  textDecorationColor: "inherit"
};

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  mark: Mark,
  children: Element<*>,
  attributes: ?any
};

export default function createRenderMark(opt: typeOptions) {
  const { type, data: dataField, styles: styleFields, alpha } = opt;
  return (props: Props) => {
    if (props.mark.type === type) {
      const {
        children,
        attributes,
        mark: { data }
      } = props;
      let { style } = attributes || {};
      const color = tinycolor(data.get(dataField));
      style = {
        ...defaultStyle,
        ...style,
        textDecoration: "inherit",
        decorationStyle: "initial",
        ...styleFields.reduce(
          (acc, styleField) => ({
            ...acc,
            [styleField]: color.setAlpha(alpha).toRgbString()
          }),
          {}
        )
      };
      return (
        <span {...attributes} style={style}>
          {children}
        </span>
      );
    }
    return undefined;
  };
}
