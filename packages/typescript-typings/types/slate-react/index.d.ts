// ported from https://github.com/DefinitelyTyped/DefinitelyTyped
// definitions for slate-react 0.20
// TypeScript Version: 2.8
import {
  Mark,
  Node,
  Change,
  Schema,
  Value,
  Stack,
  Document,
  Editor as SlateEditor
} from "slate";
import * as Immutable from "immutable";
import * as React from "react";

// Values prefixed with "data-..." (Used for spellchecking according to docs)
export interface RenderAttributes {
  [key: string]: any;
}

export interface RenderMarkProps {
  attributes: RenderAttributes;
  children: React.ReactNode;
  editor: SlateEditor;
  mark: Mark;
  marks: Immutable.Set<Mark>;
  node: Node;
  offset: number;
  text: string;
}

export interface RenderNodeProps {
  attributes: RenderAttributes;
  children: React.ReactNode;
  editor: SlateEditor;
  isSelected: boolean;
  key: string;
  node: Node;
  parent: Node;
}

export interface Plugin {
  onBeforeInput?: (
    event: Event,
    change: Change,
    editor: SlateEditor
  ) => Change | void;
  onBlur?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onFocus?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onClick?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onCopy?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onCut?: (event: Event, change: Change, editor?: SlateEditor) => Change | void;
  onDragEnd?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onDragEnter?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onDragExit?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onDragLeave?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onDragOver?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onDragStart?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onDrop?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onInput?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onKeyDown?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onKeyUp?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onPaste?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onSelect?: (
    event: Event,
    change: Change,
    editor?: SlateEditor
  ) => Change | void;
  onChange?: (change: Change, editor?: SlateEditor) => any;
  renderEditor?: (
    props: RenderAttributes,
    editor?: SlateEditor
  ) => object | void;
  schema?: Schema;
  decorateNode?: (node: Node) => Range[] | void;
  renderMark?: (props: RenderMarkProps) => any;
  renderNode?: (props: RenderNodeProps) => any;
  renderPlaceholder?: (props: RenderAttributes) => any;
  renderPortal?: (props: RenderAttributes) => any;
  validateNode?: (node: Node) => any;
}

export interface BasicEditorProps {
  value: Value;
  autoCorrect?: boolean;
  autoFocus?: boolean;
  className?: string;
  onChange?: (change: Change) => any;
  placeholder?: any;
  plugins?: Plugin[];
  readOnly?: boolean;
  role?: string;
  schema?: Schema;
  spellCheck?: boolean;
  style?: React.CSSProperties;
  tabIndex?: number;
}

// tsling:disable interface-over-type-literal
export type EditorProps = BasicEditorProps & Plugin;

export interface EditorState {
  schema: Schema;
  value: Value;
  stack: Stack; // [TODO] define stack
}

export class Editor extends React.Component<EditorProps, EditorState> {
  schema: Schema;
  value: Value;
  stack: Stack;

  readonly plugins: Plugin[];

  // Instance Methods
  blur(): void;
  change(fn: (change: Change) => any): void;
  change(...args: any[]): void;
  focus(): void;
}

export type SlateType =
  | "fragment"
  | "html"
  | "node"
  | "rich"
  | "text"
  | "files";

export function cloneFragment(
  event: Event,
  editor: SlateEditor,
  callback?: () => void
): void;
export function findDOMNode(node: Node, win?: Window): Element;
export function findDOMRange(range: Range, win?: Window): Range;
export function findNode(element: Element, value: Value): Node;
export function findRange(selection: Selection, value: Value): Range;
export function getEventRange(event: Event, value: Value): Range;
export function getEventTransfer(event: Event): { type: SlateType; node: Node };
export function setEventTransfer(
  event: Event,
  type: SlateType,
  data: any
): void;
