import { Change, Block } from "slate";
import { TypeOptions } from "../options";

export interface SlateSchemas {
  validateNode?: (block: Block) => any;
  getSchema?: () => object;
}

export default function createSchema(opts: TypeOptions) {
  const { indentable, dataField, maxIndentation } = opts;
  const schemas: SlateSchemas = {};
  schemas.validateNode = (block: Block) => {
    if (block.object !== "block") return undefined;
    if (!indentable.includes(block.type)) return undefined;
    if (!block.data || !block.data.get(dataField)) return undefined;
    if (block.data.get(dataField) <= maxIndentation) return undefined;
    return (change: Change) =>
      change.setNodeByKey(
        block.key,
        { data: block.data.set(dataField, maxIndentation) },
        { normalize: false }
      );
  };
  return schemas;
}
