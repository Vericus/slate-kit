import { Record } from "immutable";

export interface SlateKitRenderer {
  children: () => any;
  node?: JSX.Element;
}

export interface MarksRenderer {
  [key: string]: SlateKitRenderer;
}

export interface NodesRenderer {
  [key: string]: SlateKitRenderer;
}

export interface TypeOptions {
  marks: MarksRenderer;
  nodes: NodesRenderer;
  toolbars: any[];
}

const defaultOptions = {
  marks: {},
  nodes: {},
  toolbars: []
};

export default class Options extends Record(defaultOptions) {
  marks: MarksRenderer;
  nodes: NodesRenderer;
  toolbars: any[];
}
