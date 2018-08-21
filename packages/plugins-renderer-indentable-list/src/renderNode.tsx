import * as React from "react";
import { Node } from "slate";
import { TypeOptions } from "./options";

export interface Props {
  attributes: any;
  children: JSX.Element;
  className: string;
  onMouseDown: () => {};
  node: Node;
}

const OrderedList = ({ className, attributes, children }: Props) => (
  <ol className={className} {...attributes}>
    <li>{children}</li>
  </ol>
);

const UnOrderedList = ({ className, attributes, children }: Props) => (
  <ul className={className} {...attributes}>
    <li>{children}</li>
  </ul>
);

const CheckList = ({ className, attributes, children, onMouseDown }: Props) => (
  <ul className={className} {...attributes}>
    <li onMouseDown={onMouseDown}>{children}</li>
  </ul>
);

export function createRenderNode(opts: TypeOptions, pluginsWrapper: any) {
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
