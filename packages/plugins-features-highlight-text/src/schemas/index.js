// @flow
import tinycolor from "tinycolor2";
import { type typeOptions } from "../options";

export default function createSchema(opts: typeOptions) {
  const { type, data } = opts;
  const schemas = {};
  const schema = {
    document: {
      marks: [
        {
          type,
          data: {
            [data]: e => !e || tinycolor(e).isValid()
          }
        }
      ]
    }
  };
  schemas.getSchema = () => schema;
  return schemas;
}
