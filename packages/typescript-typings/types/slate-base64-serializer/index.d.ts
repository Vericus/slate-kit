// ported from https://github.com/DefinitelyTyped/DefinitelyTyped
// definitions for slate-base64-serializer 0.2
// TypeScript Version: 3.1
declare module "slate-base64-serializer" {
  import { Value, Node } from "slate";

  export function deserialize(string: string, options?: object): Value;
  export function deserializeNode(string: string, options?: object): Node;
  export function serialize(value: Value, options?: object): string;
  export function serializeNode(node: Node, options?: object): string;

  export {};
}
