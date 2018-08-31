import { Block, Change } from "slate";
import { TypeOptions } from "../options";

export interface SlateSchemas {
  validateNode?: (block: Block) => any;
  getSchema?: () => object;
}

export interface SlateSchema {
  blocks?: object;
}

export default function createSchema(opts: TypeOptions) {
  const { blockTypes } = opts;
  const schemas: SlateSchemas = {};
  const schema: SlateSchema = {};
  schema.blocks = {};
  blockTypes.forEach(block => {
    if (schema.blocks) {
      schema.blocks[block] = {
        isVoid: false
      };
    }
  });
  schemas.validateNode = (block: Block) => {
    if (block.object !== "block") return undefined;
    if (!blockTypes.includes(block.type)) return undefined;
    if (
      blockTypes.includes(block.type) &&
      !block.nodes.some(node => !!(node && node.object === "block"))
    ) {
      return undefined;
    }
    return (change: Change) => {
      change.withoutNormalization(c => {
        block.nodes.forEach(b => {
          if (Block.isBlock(b) && blockTypes.includes(b.type)) {
            c.unwrapBlockByKey(b.key);
          }
        });
      });
    };
  };
  schemas.getSchema = () => schema;
  return schemas;
}
