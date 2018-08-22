import { Change, Block } from "slate";
import { NODE_DATA_INVALID } from "slate-schema-violations";
import { TypeOptions } from "../options";

export default function createSchema(opts: TypeOptions) {
  const { indentable, dataField, maxIndentation } = opts;
  return {
    blocks: indentable.reduce(
      (acc, block) => ({
        ...acc,
        [block]: {
          data: {
            [dataField]: indentation =>
              !indentation ||
              (indentation && indentation <= maxIndentation && indentation >= 0)
          },
          normalize: (change: Change, error) => {
            if (error.code === NODE_DATA_INVALID) {
              const data = error.node.data.get(dataField);
              if (typeof data !== "number" || data < 0) {
                change.withoutNormalization(c =>
                  c.setNodeByKey(error.node.key, {
                    data: error.node.data.delete(dataField)
                  })
                );
              } else {
                change.withoutNormalization(c =>
                  c.setNodeByKey(error.node.key, {
                    data: error.node.data.set(dataField, maxIndentation)
                  })
                );
              }
            }
          }
        }
      }),
      {}
    )
  };
}
