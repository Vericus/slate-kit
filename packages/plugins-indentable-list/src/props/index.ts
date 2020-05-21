import classnames from "classnames";

export default function createProps(opts) {
  const { blockTypes, startAtField, checkField } = opts;
  const { orderedlist, unorderedlist, checklist } = blockTypes;
  const listTypes = [orderedlist, unorderedlist, checklist];
  return (nodeProps) => {
    const { editor, node, key } = nodeProps;
    if (!node || !key || !listTypes.includes(node.type)) {
      return nodeProps;
    }
    const {
      value: { document },
    } = editor;
    const previousBlock = document.getPreviousBlock(key);
    const prevIndentation =
      previousBlock && editor.getIndentationLevel(previousBlock);
    const indentation = editor.getIndentationLevel(node);
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
      nodeProps.node.type === checklist
        ? (e) => {
            const { top } = e.target.getBoundingClientRect();
            let left;
            if (e.target.children && e.target.children[0]) {
              const {
                left: leftBound,
              } = e.target.children[0].getBoundingClientRect();
              left = leftBound;
            }
            const targetStyle = getComputedStyle(e.target);
            const fontSize = parseInt(targetStyle.fontSize || "16px", 10);
            if (
              !(
                left &&
                e.clientX >= left - 2 * fontSize &&
                e.clientX <= left &&
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
              !editor.toggleCheck ||
              nodeProps.editor.props.readOnly
            ) {
              return;
            }
            nodeProps.editor.toggleCheck(node);
          }
        : () => {};
    const className = classnames({
      [nodeProps.className]: nodeProps.className,
      "list-reset": shouldReset,
      [`list-reset-${indentation + 1}`]: indentation && shouldReset,
      checked: !!checked,
      checkList: nodeProps.node.type === checklist,
      readOnly:
        nodeProps.node.type === checklist && nodeProps.editor.props.isReadOnly,
    });
    return {
      ...nodeProps,
      className,
      onMouseDown,
      attributes: {
        ...nodeProps.attributes,
        style,
      },
    };
  };
}
