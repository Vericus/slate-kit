// @flow
import { type typeOptions } from "./options";
import getAlignment from "./utils/getAlignment";

export default function createProps(opts: typeOptions) {
  const { floatBlocks, textBlocks } = opts;
  return {
    getProps: props => {
      if (
        !props.node ||
        props.node.object !== "block" ||
        !(
          textBlocks.includes(props.node.type) ||
          floatBlocks.includes(props.node.type)
        )
      )
        return props;
      const alignment = getAlignment(opts, props.node);
      let style = (props.attributes && props.attributes.style) || {};
      if (textBlocks.includes(props.node.type)) {
        style = {
          ...style,
          textAlign: alignment
        };
      }
      if (floatBlocks.includes(props.node.type)) {
        style = {
          ...style,
          float: alignment
        };
      }
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
