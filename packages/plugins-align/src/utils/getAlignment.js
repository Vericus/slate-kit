// @flow
import type { Block } from "slate";
import { type typeOptions } from "../options";

function getAlignment(opts: typeOptions, block: Block) {
  return (block && block.data.get("textAlign")) || "left";
}

export default getAlignment;
