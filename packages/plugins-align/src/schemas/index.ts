import { Change, Node } from "slate";
import { TypeOptions } from "../options";
import { NODE_DATA_INVALID } from "slate-schema-violations";

export default function createSchema(opts: TypeOptions) {
  const { floatBlocks, textBlocks, dataField, alignments } = opts;
  const alignBlocks = [...floatBlocks, ...textBlocks];
  return {
    blocks: alignBlocks.reduce(
      (acc, block) => ({
        ...acc,
        [block]: {
          data: {
            [dataField]: align =>
              !align || (align && alignments.includes(align))
          },
          normalize: (change: Change, error) => {
            if (error.code === NODE_DATA_INVALID) {
              change.withoutNormalization(c =>
                c.setNodeByKey(error.node.key, {
                  data: error.node.data.delete(dataField)
                })
              );
            }
          }
        }
      }),
      {}
    )
  };
}
