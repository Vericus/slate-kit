// @flow
import type { Block, Change } from "slate";
import { type typeOptions } from "../options";

export default function createSchema(opts: typeOptions) {
  const { blockTypes } = opts;
  const schemas = {};
  const schema = {};
  schema.blocks = {};
  blockTypes.forEach(block => {
    schema.blocks[block] = {
      isVoid: false
    };
  });
  schemas.validateNode = (block: Block) => {
    if (block.object !== "block") return undefined;
    if (!blockTypes.includes(block.type)) return undefined;
    if (
      blockTypes.includes(block.type) &&
      !block.nodes.some(node => node && node.object === "block")
    ) {
      return undefined;
    }
    return (change: Change) => {
      change.withoutNormalization(c => {
        block.nodes.forEach(b => {
          if (blockTypes.includes(b.type)) {
            c.unwrapBlockByKey(b.key);
          }
        });
      });
    };
  };
  schemas.getSchema = () => schema;
  return schemas;
}
