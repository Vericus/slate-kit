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
    getProps: nodeProps => {
      const { getIndentationLevel } = pluginsWrapper.getUtils("indent");
      const { toggleCheck } = changes;
      if (!nodeProps.node || !listTypes.includes(nodeProps.node.type)) {
        return nodeProps;
      }
      const { editor, key, node } = nodeProps;
      const {
        state: {
          value: { document }
        }
      } = editor;
      const previousBlock = document.getPreviousBlock(key);
      const prevIndentation =
        previousBlock && getIndentationLevel(previousBlock);
      const indentation = getIndentationLevel(nodeProps.node);
      const startAt = nodeProps.node.data.get(startAtField);
      const checked = nodeProps.node.data.get(checkField);
      const style =
        nodeProps.attributes && nodeProps.attributes.style
          ? nodeProps.attributes.style
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
        nodeProps.node.type === checkList
          ? e => {
              const { top, left } = e.target.getBoundingClientRect();
              const targetStyle = getComputedStyle(e.target);
              const fontSize = parseInt(targetStyle.fontSize || "16px", 10);
              if (
                !(
                  e.clientX >= left &&
                  e.clientX <= left + fontSize &&
                  e.clientY >= top + fontSize * 0.3 &&
                  e.clientY <= top + fontSize * 1.3 &&
                  e.target.nodeName.toLowerCase() === "li"
                )
              ) {
                return;
              }
              e.preventDefault();
              e.stopPropagation();
              if (
                nodeProps.editor.props.isReadOnly ||
                !toggleCheck ||
                nodeProps.editor.props.readOnly
              ) {
                return;
              }
              const {
                state: { value },
                props: { onChange }
              } = nodeProps.editor;
              onChange(toggleCheck(value.change(), node));
            }
          : () => {};
      const className = classnames({
        [nodeProps.className]: nodeProps.className,
        "list-reset": shouldReset,
        [`list-reset-${indentation}`]: indentation && shouldReset,
        checked: !!checked,
        checkList: nodeProps.node.type === checkList,
        readOnly:
          nodeProps.node.type === checkList && nodeProps.editor.props.isReadOnly
      });
      return {
        ...nodeProps,
        className,
        onMouseDown,
        attributes: {
          ...nodeProps.attributes,
          style
        }
      };
    }
  };
}
