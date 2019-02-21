// ported from https://github.com/DefinitelyTyped/DefinitelyTyped
// definitions for slate-react 0.20
// TypeScript Version: 2.8
declare module "slate-react" {
  import {
    Mark,
    Node,
    Block,
    Inline,
    Schema,
    Value,
    Stack,
    Document,
    Editor as Controller,
    Operations,
    Operation,
    Change,
    Plugin,
    Range,
    EditorProps
  } from "slate";
  import * as Immutable from "immutable";
  import * as React from "react";

  export interface EditorState {
    schema: Schema;
    value: Value;
    stack: Stack; // [TODO] define stack
  }

  export class Editor extends React.Component<EditorProps, EditorState> {
    schema: Schema;
    stack: Stack;

    readonly plugins: Plugin[];
    readonly operations: Immutable.List<Operation>;
    readonly readOnly: boolean;
    readonly value: Value;

    // Instance Methods
    applyOperation(...args: any[]): Controller;
    blur(): void;
    command(...args: any[]): Controller;
    focus(): void;
    normalize(...args: any[]): Controller;
    query(...args: any[]): Controller;
    resolveController(
      plugins: Plugin[],
      schema: Schema,
      commands: any[],
      queries: any[]
    ): void;
    run(...args: any[]): any;
    withoutNormalizing(...args: any[]): Controller;
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
    editor: Controller,
    callback?: () => void
  ): void;
  export function findDOMNode(node: Node, win?: Window): Element;
  export function findDOMRange(range: Range, win?: Window): Range;
  export function findNode(element: Element, value: Value): Node;
  export function findRange(selection: Selection, value: Value): Range;
  export function getEventRange(event: Event, value: Value): Range;
  export function getEventTransfer(
    event: Event
  ): {
    type: SlateType;
    files: File[];
    fragment: Document;
    html: string;
    node: Node;
    rich: string;
    text: string;
  };
  export function setEventTransfer(
    event: Event,
    type: SlateType,
    data: any
  ): void;
}
