import { Change, Block } from "slate";
import { TypeOptions } from "../options";

export interface SlateSchemas {
  validateNode?: (block: Block) => any;
  getSchema?: () => object;
}

export default function createSchema(opts: TypeOptions) {
  const { ordered, unordered, checkList, startAtField, checkField } = opts;
  if (startAtField && checkField && ordered && unordered && checkList) {
    return {
      blocks: {
        [ordered]: {
          data: {
            [startAtField]: startAt =>
              !startAt || typeof parseInt(startAt, 10) === "number",
            [checkField]: checked => checked === undefined
          },
          normalize: (change: Change, error) => {
            if (error.code === "node_data_invalid") {
              let blockData = error.node.data;
              if (blockData.get(checkField) !== undefined) {
                blockData = blockData.delete(checkField);
              }
              if (
                typeof parseInt(blockData.get(startAtField), 10) !== "number"
              ) {
                blockData = blockData.delete(startAtField);
              }
              change.withoutNormalization(c =>
                c.setNodeByKey(error.node.key, { data: blockData })
              );
            }
          }
        },
        [unordered]: {
          data: {
            [startAtField]: startAt => startAt === undefined,
            [checkField]: checked => checked === undefined
          },
          normalize: (change: Change, error) => {
            if (error.code === "node_data_invalid") {
              change.withoutNormalization(c =>
                c.setNodeByKey(error.node.key, {
                  data: error.node.data.delete(checkField).delete(startAtField)
                })
              );
            }
          }
        },
        [checkList]: {
          data: {
            [startAtField]: startAt => startAt === undefined,
            [checkField]: checked => typeof checked === "boolean"
          },
          normalize: (change: Change, error) => {
            if (error.code === "node_data_invalid") {
              let blockData = error.node.data;
              if (blockData.get(startAtField) !== undefined) {
                blockData = blockData.delete(startAtField);
              }
              if (typeof blockData.get(checkField) !== "boolean") {
                blockData = blockData.set(checkField, false);
              }
              change.withoutNormalization(c =>
                c.setNodeByKey(error.node.key, { data: blockData })
              );
            }
          }
        }
      }
    };
  }
  return {};
}
