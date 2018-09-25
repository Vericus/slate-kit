import * as React from "react";
import SlateTypes from "slate-prop-types";
import { Node } from "slate";

export interface Props {
  attributes: any;
  children: JSX.Element;
  className: string;
  onMouseDown?: () => {};
  node: Node;
}

const OrderedList: React.SFC<Props> = props => {
  const { attributes, children, ...rest } = props;
  return (
    <ol {...attributes} {...rest}>
      <li>{children}</li>
    </ol>
  );
};

const UnOrderedList: React.SFC<Props> = props => {
  const { attributes, children, ...rest } = props;
  return (
    <ul {...attributes} {...rest}>
      <li>{children}</li>
    </ul>
  );
};

const CheckList: React.SFC<Props> = props => {
  const { attributes, children, onMouseDown, ...rest } = props;
  return (
    <ul {...attributes} {...rest}>
      <li onMouseDown={onMouseDown}>{children}</li>
    </ul>
  );
};

OrderedList.propTypes = SlateTypes.Block;
UnOrderedList.propTypes = SlateTypes.Block;
CheckList.propTypes = SlateTypes.Block;

export function createRenderNode() {
  return {
    nodes: {
      orderedlist: OrderedList,
      unorderedlist: UnOrderedList,
      checklist: CheckList
    }
  };
}

export { createRenderNode as default, OrderedList, UnOrderedList, CheckList };
