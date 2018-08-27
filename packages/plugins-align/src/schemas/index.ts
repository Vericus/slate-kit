import { Change, Node } from "slate";
import { TypeOptions } from "../options";

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
            if (error.code === "node_data_invalid") {
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
