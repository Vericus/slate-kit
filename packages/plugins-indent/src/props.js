import classnames from "classnames";

export default function createProps(opts, utils) {
  const { indentable } = opts;
  const { getIndentationLevel } = utils;
  return {
    getProps: props => {
      if (!props.node || !indentable.includes(props.node.type)) return props;
      const indentLevel = getIndentationLevel(props.node);
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
