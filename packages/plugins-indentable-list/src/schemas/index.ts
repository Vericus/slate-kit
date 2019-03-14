import { Editor, Block, SlateError, Inline } from "slate";
import { TypeOptions } from "../options";

export interface SlateSchemas {
  validateNode?: (block: Block) => any;
  getSchema?: () => object;
}

export default function createSchema(opts: TypeOptions) {
  const { blockTypes, startAtField, checkField } = opts;
  const { orderedlist, unorderedlist, checklist } = blockTypes;
  if (startAtField && checkField && orderedlist && unorderedlist && checklist) {
    return {
      blocks: {
        [orderedlist]: {
          data: {
            [startAtField]: startAt =>
              !startAt || typeof parseInt(startAt, 10) === "number",
            [checkField]: checked => checked === undefined
          },
          normalize: (editor: Editor, error: SlateError) => {
            const { code, node } = error;
            if (
              code === "node_data_invalid" &&
              (Block.isBlock(node) || Inline.isInline(node))
            ) {
              let blockData = node.data;
              if (blockData.get(checkField) !== undefined) {
                blockData = blockData.delete(checkField);
              }
              if (
                typeof parseInt(blockData.get(startAtField), 10) !== "number"
              ) {
                blockData = blockData.delete(startAtField);
              }
              editor.withoutNormalizing(() =>
                editor.setNodeByKey(node.key, { data: blockData })
              );
            }
          }
        },
        [unorderedlist]: {
          data: {
            [startAtField]: startAt => startAt === undefined,
            [checkField]: checked => checked === undefined
          },
          normalize: (editor: Editor, error: SlateError) => {
            const { code, node } = error;
            if (
              code === "node_data_invalid" &&
              (Block.isBlock(node) || Inline.isInline(node))
            ) {
              editor.withoutNormalizing(() =>
                editor.setNodeByKey(node.key, {
                  data: node.data.delete(checkField).delete(startAtField)
                })
              );
            }
          }
        },
        [checklist]: {
          data: {
            [startAtField]: startAt => startAt === undefined,
            [checkField]: checked => typeof checked === "boolean"
          },
          normalize: (editor: Editor, error: SlateError) => {
            const { code, node } = error;
            if (
              code === "node_data_invalid" &&
              (Block.isBlock(node) || Inline.isInline(node))
            ) {
              let blockData = node.data;
              if (blockData.get(startAtField) !== undefined) {
                blockData = blockData.delete(startAtField);
              }
              if (typeof blockData.get(checkField) !== "boolean") {
                blockData = blockData.set(checkField, false);
              }
              editor.withoutNormalizing(() =>
                editor.setNodeByKey(node.key, { data: blockData })
              );
            }
          }
        }
      }
    };
  }
  return {};
}
