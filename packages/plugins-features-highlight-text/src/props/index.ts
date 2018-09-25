import { TypeOptions } from "../options";
import tinycolor from "tinycolor2";

const defaultStyle = {
  textDecoration: "inherit",
  textDecorationColor: "inherit"
};

export default function createProps(opts: TypeOptions) {
  const { type, data: dataField, styles: styleFields, alpha } = opts;
  return {
    getProps: props => {
      if (!props.mark || props.mark.type !== type) return props;
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
      return {
        ...props,
        attributes: {
          ...props.attributes,
          style
        }
      };
    }
  };
}
