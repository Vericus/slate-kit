import classnames from "classnames";

export default function createProps(opts, pluginsWrapper) {
  const {
    ordered,
    unordered,
    checkList,
    startAtField,
    checkField,
    changes
  } = opts;
  const listTypes = [ordered, unordered, checkList];
  return {
    getProps: props => {
      const { getIndentationLevel } = pluginsWrapper.getUtils("indent");
      const { toggleCheck } = changes;
      if (!props.node || !listTypes.includes(props.node.type)) return props;
      const { editor, key, node } = props;
      const {
        state: {
          value: { document }
        }
      } = editor;
      const previousBlock = document.getPreviousBlock(key);
      const prevIndentation =
        previousBlock && getIndentationLevel(previousBlock);
      const indentation = getIndentationLevel(props.node);
      const startAt = props.node.data.get(startAtField);
      const checked = props.node.data.get(checkField);
      const style =
        props.attributes && props.attributes.style
          ? props.attributes.style
          : {};
      if (startAt) {
        style["--start-at"] = startAt;
      }
      const shouldReset =
        !previousBlock ||
        (previousBlock && previousBlock.type !== node.type) ||
        prevIndentation < indentation ||
        startAt;
      const onMouseDown =
        props.node.type === checkList
          ? e => {
              const { top } = e.target.getBoundingClientRect();
              let left;
              if (e.target.children && e.target.children[0]) {
                const {
                  left: leftBound
                } = e.target.children[0].getBoundingClientRect();
                left = leftBound;
              }
              const targetStyle = getComputedStyle(e.target);
              const fontSize = parseInt(targetStyle.fontSize, 10);
              if (
                !(
                  left &&
                  e.clientX >= left - 2 * fontSize &&
                  e.clientX <= left &&
                  e.clientY >= top + fontSize * 0.3 &&
                  e.clientY <= top + fontSize * 1.3 &&
                  e.target.nodeName.toLowerCase() === "li"
                )
              )
                return;
              e.preventDefault();
              e.stopPropagation();
              if (
                props.editor.props.isReadOnly ||
                !toggleCheck ||
                props.editor.props.readOnly
              )
                return;
              const {
                state: { value },
                props: { onChange }
              } = props.editor;
              onChange(toggleCheck(value.change(), node));
            }
          : () => {};
      const className = classnames({
        [props.className]: props.className,
        "list-reset": shouldReset,
        [`list-reset-${indentation}`]: indentation && shouldReset,
        checked: !!checked,
        checkList: props.node.type === checkList,
        readOnly: props.node.type === checkList && props.editor.props.isReadOnly
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
