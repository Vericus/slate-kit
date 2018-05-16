// @flow
import { type typeOptions } from "../options";

export default function createSchema(opts: typeOptions) {
  const { marks } = opts;
  const schemas = {};
  const schema = {
    document: {
      marks: marks.map(mark => ({ type: mark }))
    }
  };
  schemas.getSchema = () => schema;
  return schemas;
}
