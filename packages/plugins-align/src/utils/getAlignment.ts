import { Block } from "slate";
import { TypeOptions } from "../options";

function getAlignment(opts: TypeOptions, block: Block) {
  const { dataField } = opts;
  return (block && block.data.get(dataField)) || "left";
}

export default getAlignment;
