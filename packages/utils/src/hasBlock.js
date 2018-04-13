// @flow
import type { Value } from "slate";

// check if currentSelection has block of type
export default function hasBlock(value: Value, type: string) {
  return value.blocks.some(node => node.type === type);
}
