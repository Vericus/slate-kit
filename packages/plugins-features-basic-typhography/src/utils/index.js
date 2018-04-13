// @flow
import { type Node } from "slate";
import { type typeOptions } from "../options";

export default function createUtils(opts: typeOptions) {
  const { blockTypes } = opts;
  return {
    isTypography: (node: Node) => blockTypes.includes(node.type)
  };
}
