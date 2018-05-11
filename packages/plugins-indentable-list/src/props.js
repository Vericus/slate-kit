import classnames from "classnames";

export default function createProps(opts, changes) {
  const { ordered, unordered, checkList } = opts;
  const listTypes = [ordered, unordered, checkList];
  const { toggleCheck } = changes;
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
      const checked = props.node.data.get("checked");
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
      const onMouseDown =
        props.node.type === checkList
          ? e => {
              e.preventDefault();
              e.stopPropagation();
              const { editor, node } = props;
              const {
                state: { value },
                props: { onChange }
              } = editor;
              onChange(toggleCheck(value.change(), node));
            }
          : () => {};
      const className = classnames({
        [props.className]: props.className,
        "list-reset": shouldReset,
        [`list-reset-${indentation}`]: indentation && shouldReset,
        checked: !!checked,
        checkList: props.node.type === checkList
      });
      return {
        ...props,
        className,
        onMouseDown,
        attributes: {
          ...props.attributes,
          style
        }
      };
    }
  };
}
