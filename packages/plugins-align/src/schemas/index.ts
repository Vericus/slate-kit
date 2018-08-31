import { Change, Node, SlateError, Text } from "slate";
import { TypeOptions } from "../options";

export default function createSchema(opts: TypeOptions) {
  const { floatBlocks, textBlocks, dataField, alignments } = opts;
  const alignBlocks = [...floatBlocks, ...textBlocks];
  return {
    blocks: alignBlocks.reduce(
      (acc: object, block) => ({
        ...acc,
        [block]: {
          data: {
            [dataField]: align =>
              !align || (align && alignments.includes(align))
          },
          normalize: (change: Change, error: SlateError) => {
            if (error.code === "node_data_invalid") {
              change.withoutNormalization(c => {
                if (!Text.isText(error.node)) {
                  c.setNodeByKey(error.node.key, {
                    data: error.node.data.delete(dataField)
                  });
                }
              });
            }
          }
        }
      }),
      {}
    )
  };
}
