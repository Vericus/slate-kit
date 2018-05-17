// @flow
import { type typeOptions } from "../options";

export default function createSchema(opts: typeOptions) {
  const { indentable, dataField, maxIndentation } = opts;
  const schemas = {};
  schemas.validateNode = block => {
    if (block.object !== "block") return undefined;
    if (!indentable.includes(block.type)) return undefined;
    if (!block.data || !block.data.get(dataField)) return undefined;
    if (block.data.get(dataField) <= maxIndentation) return undefined;
    return change =>
      change.setNodeByKey(
        block.key,
        { data: block.data.set(dataField, maxIndentation) },
        { normalize: false }
      );
  };
  return schemas;
}
