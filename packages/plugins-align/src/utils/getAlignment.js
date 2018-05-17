// @flow
import type { Block } from "slate";
import { type typeOptions } from "../options";

function getAlignment(opts: typeOptions, block: Block) {
  const { dataField } = opts;
  return (block && block.data.get(dataField)) || "left";
}

export default getAlignment;
