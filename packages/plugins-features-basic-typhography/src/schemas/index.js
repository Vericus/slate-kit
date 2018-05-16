// @flow
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
  schema.document = {
    nodes: [{ types: blockTypes }]
  };
  schemas.getSchema = () => schema;
  return schemas;
}
