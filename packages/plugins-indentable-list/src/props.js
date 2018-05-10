import classnames from "classnames";

export default function createProps(opts) {
  const { ordered, unordered } = opts;
  const listTypes = [ordered, unordered];
  return {
    getProps: props => {
      if (!props.node || !listTypes.includes(props.node.type)) return props;
      const { editor, key, node } = props;
      const {
        state: {
          value: { document }
        }
      } = editor;
      const previousBlock = document.getPreviousBlock(key);
      const prevIndentation =
        (previousBlock && previousBlock.data.get("indentation")) || 0;
      const indentation = props.node.data.get("indentation") || 0;
      const startAt = props.node.data.get("startAt");
      const style =
        props.attributes && props.attributes.style
          ? props.attributes.style
          : {};
      if (startAt) {
        style["--start-at"] = startAt - 1;
      }
      const shouldReset =
        (previousBlock && previousBlock.type !== node.type) ||
        prevIndentation < indentation ||
        startAt;
      const className = classnames({
        [props.className]: props.className,
        "list-reset": shouldReset,
        [`list-reset-${indentation}`]: indentation && shouldReset
      });
      return {
        ...props,
        className,
        attributes: {
          ...props.attributes,
          style
        }
      };
    }
  };
}
