import { Editor, SlateError, Text } from "slate";
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
          normalize: (editor: Editor, error: SlateError) => {
            if (error.code === "node_data_invalid") {
              editor.withoutNormalizing(e => {
                if (!Text.isText(error.node)) {
                  e.setNodeByKey(error.node.key, {
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
