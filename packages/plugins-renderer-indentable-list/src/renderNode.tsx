import * as React from "react";
import Register from "@vericus/slate-kit-utils-register-helpers";
import SlateTypes from "slate-prop-types";
import { Node, Plugin } from "slate";

export interface Props {
  attributes: any;
  children: JSX.Element;
  className: string;
  onMouseDown?: () => {};
  node: Node;
}

const OrderedList: React.SFC<Props> = (props) => {
  const { attributes, children, className } = props;
  return (
    <ol {...attributes} className={className}>
      <li>{children}</li>
    </ol>
  );
};

const UnOrderedList: React.SFC<Props> = (props) => {
  const { attributes, children, className } = props;
  return (
    <ul {...attributes} className={className}>
      <li>{children}</li>
    </ul>
  );
};

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
const CheckList: React.SFC<Props> = (props) => {
  const { attributes, children, onMouseDown, className } = props;
  return (
    <ul {...attributes} className={className}>
      <li onMouseDown={onMouseDown}>{children}</li>
    </ul>
  );
};
/* eslint-enable */

OrderedList.propTypes = SlateTypes.Block;
UnOrderedList.propTypes = SlateTypes.Block;
CheckList.propTypes = SlateTypes.Block;

export function createRenderNode(): Plugin {
  const nodesRenderer = {
    orderedlist: OrderedList,
    unorderedlist: UnOrderedList,
    checklist: CheckList,
  };
  return Register({ nodesRenderer });
}

export { createRenderNode as default, OrderedList, UnOrderedList, CheckList };
