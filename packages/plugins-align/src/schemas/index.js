// @flow
import type { Block, Change } from "slate";
import { type typeOptions } from "../options";

export default function createSchema(opts: typeOptions) {
  const { floatBlocks, textBlocks, dataField, alignments } = opts;
  const alignBlocks = [...floatBlocks, ...textBlocks];
  const schemas = {};
  schemas.validateNode = (block: Block) => {
    if (block.object !== "block") return undefined;
    if (!alignBlocks.includes(block.type)) return undefined;
    if (!block.data || !block.data.get(dataField)) return undefined;
    if (alignments.includes(block.data.get(dataField))) return undefined;
    return (change: Change) =>
      change.setNodeByKey(
        block.key,
        { data: block.data.delete(dataField) },
        { normalize: false }
      );
  };
  return schemas;
}
