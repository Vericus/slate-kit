import { Node, Editor } from "slate";

export interface Props {
  attributes: any;
  children: JSX.Element;
  className?: string;
  node: Node;
  parent?: Node;
  isSelected?: boolean;
  imageType?: string;
  editor: Editor;
}
