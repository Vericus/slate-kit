import { Block, Change } from "slate";
import { TypeOptions } from "../options";

export interface SlateSchemas {
  validateNode?: (block: Block) => any;
  getSchema?: () => object;
}

export default function createSchema(opts: TypeOptions) {
  const { floatBlocks, textBlocks, dataField, alignments } = opts;
  const alignBlocks = [...floatBlocks, ...textBlocks];
  const schemas: SlateSchemas = {};
  schemas.validateNode = (block: Block) => {
    if (block.object !== "block") return undefined;
    if (!alignBlocks.includes(block.type)) return undefined;
    if (!block.data || !block.data.get(dataField)) return undefined;
    if (!alignments || alignments.includes(block.data.get(dataField))) {
      return undefined;
    }
    return (change: Change) =>
      change.setNodeByKey(
        block.key,
        { data: block.data.delete(dataField) },
        { normalize: false }
      );
  };
  return schemas;
}
