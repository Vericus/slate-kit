import * as React from "react";
import { Mark } from "slate";
import tinycolor from "tinycolor2";

const defaultStyle = {
  textDecoration: "inherit",
  textDecorationColor: "inherit"
};

export interface Props {
  mark: Mark;
  children: JSX.Element;
  attributes: any;
}

export default function createRenderMark(opt: any) {
  const { type, data: dataField, styles: styleFields, alpha } = opt;
  return (props: Props) => {
    if (props.mark.type === type) {
      const {
        children,
        attributes,
        mark: { data }
      } = props;
      let { style } = attributes || { style: {} };
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
