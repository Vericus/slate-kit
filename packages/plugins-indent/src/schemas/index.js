// @flow
import type { Change, Block } from "slate";
import { type typeOptions } from "../options";

export default function createSchema(opts: typeOptions) {
  const { indentable, dataField, maxIndentation } = opts;
  const schemas = {};
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
