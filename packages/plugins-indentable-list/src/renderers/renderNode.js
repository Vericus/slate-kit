// @flow
import React, { type Element } from "react";
import { type Node } from "slate";
import Types from "slate-prop-types";
import type { typeOptions } from "../options";

type Props = {
  attributes: any,
  children: Element<*>,
  node: Node
};

const OrderedList = ({ className, attributes, children }) => (
  <ol className={className} {...attributes}>
    <li>{children}</li>
  </ol>
);

const UnOrderedList = ({ className, attributes, children }) => (
  <ul className={className} {...attributes}>
    <li>{children}</li>
  </ul>
);

const CheckList = ({ className, attributes, children, onMouseDown }) => (
  <div className={className} {...attributes}>
    <p>
      <span onMouseDown={onMouseDown} className="checkbox" />
      {children}
    </p>
  </div>
);

export function createRenderNode(opts, pluginsWrapper) {
  const { ordered, unordered, checkList } = opts;
  return (props: Props) => {
    const newProps = pluginsWrapper.getProps(props);
    switch (newProps.node.type) {
      case ordered:
        return <OrderedList {...newProps} />;
      case unordered:
        return <UnOrderedList {...newProps} />;
      case checkList:
        return <CheckList {...newProps} />;
      // no default
    }
    return undefined;
  };
}

export { createRenderNode as default, OrderedList, UnOrderedList };
