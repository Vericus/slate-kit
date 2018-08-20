import { Change, Block } from "slate";
import { TypeOptions } from "../options";

export interface SlateSchemas {
  validateNode?: (block: Block) => any;
  getSchema?: () => object;
}

export default function createSchema(opts: TypeOptions) {
  const { ordered, unordered, checkList, startAtField, checkField } = opts;
  const listBlocks = [ordered, unordered, checkList];
  const schemas: SlateSchemas = {};
  const schema = {};
  schemas.validateNode = (block: Block) => {
    if (block.object !== "block") return undefined;
    if (!listBlocks.includes(block.type)) return undefined;
    if (block.type === ordered) {
      if (
        block.data.get(startAtField) &&
        typeof parseInt(block.data.get(startAtField), 10) !== "number"
      ) {
        return (change: Change) =>
          change.setNodeByKey(
            block.key,
            { data: block.data.delete(checkField).delete(startAtField) },
            { normalize: false }
          );
      } else if (block.data.get(checkField)) {
        return (change: Change) =>
          change.setNodeByKey(
            block.key,
            { data: block.data.delete(checkField) },
            { normalize: false }
          );
      }
      return undefined;
    }
    if (
      block.type === unordered &&
      (block.data.get(checkField) || block.data.get(startAtField))
    ) {
      return (change: Change) =>
        change.setNodeByKey(
          block.key,
          { data: block.data.delete(checkField).delete(startAtField) },
          { normalize: false }
        );
    }
    if (block.type === checkList) {
      if (
        block.data.get(checkField) &&
        typeof block.data.get(checkField) !== "boolean"
      ) {
        return (change: Change) =>
          change.setNodeByKey(
            block.key,
            { data: block.data.delete(checkField).delete(startAtField) },
            { normalize: false }
          );
      } else if (block.data.get(startAtField)) {
        return (change: Change) =>
          change.setNodeByKey(
            block.key,
            { data: block.data.delete(startAtField) },
            { normalize: false }
          );
      }
    }
    return undefined;
  };
  schemas.getSchema = () => schema;
  return schemas;
}
