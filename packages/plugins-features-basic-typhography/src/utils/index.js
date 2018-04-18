// @flow
import type { Node, Value } from "slate";
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { type typeOptions } from "../options";

export default function createUtils(opts: typeOptions) {
  const { blockTypes } = opts;
  return {
    isTypography: (node: Node) => blockTypes.includes(node.type),
    currentTypography: (value: Value) =>
      blockTypes.find(t => {
        const selectedBlocks = getHighestSelectedBlocks(value);
        if (selectedBlocks) {
          const headBlock = selectedBlocks.get(0);
          if (headBlock) {
            return t === headBlock.type;
          }
        }
        return false;
      }) || "paragraph"
  };
}
