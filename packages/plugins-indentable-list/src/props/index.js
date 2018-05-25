import classnames from "classnames";
import { toggleCheck } from "../changes";

export default function createProps(opts, pluginsWrapper) {
  const { ordered, unordered, checkList, startAtField, checkField } = opts;
  const listTypes = [ordered, unordered, checkList];
  return {
    getProps: props => {
      const { getIndentationLevel } = pluginsWrapper.getUtils("indent");
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
              const { x } = e.target.getBoundingClientRect();
              const targetStyle = getComputedStyle(e.target);
              const fontSize = parseInt(targetStyle.fontSize, 10);
              const paddingLeft = parseInt(targetStyle.paddingLeft, 10);
              const min = x + paddingLeft - fontSize * 1.5;
              const max = x + paddingLeft - fontSize * 0.5;
              if (
                !(
                  min <= e.clientX &&
                  e.clientX <= max &&
                  e.target.nodeName.toLowerCase() === "li"
                )
              )
                return;
              e.preventDefault();
              e.stopPropagation();
              if (props.editor.props.isReadOnly) return;
              const {
                state: { value },
                props: { onChange }
              } = props.editor;
              onChange(toggleCheck(opts, value.change(), node));
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
