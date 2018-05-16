import classnames from "classnames";
import { getIndentationLevel } from "../utils";

export default function createProps(opts) {
  const { indentable } = opts;
  return {
    getProps: props => {
      if (!props.node || !indentable.includes(props.node.type)) return props;
      const indentLevel = getIndentationLevel(opts, props.node);
      const className = classnames({
        [props.className]: props.className,
        [`indentation-${indentLevel}`]: indentLevel,
        indented: indentLevel
      });
      return {
        ...props,
        className
      };
    }
  };
}
