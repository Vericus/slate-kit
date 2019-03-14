import { Editor, SlateError, Block, Inline } from "slate";
import { TypeOptions } from "../options";

export default function createSchema(opts: TypeOptions) {
  const { indentable, dataField, maxIndentation } = opts;
  return {
    blocks: indentable.reduce(
      (acc: any[], block) => ({
        ...acc,
        [block]: {
          data: {
            [dataField]: indentation =>
              !indentation ||
              (indentation && indentation <= maxIndentation && indentation >= 0)
          },
          normalize: (editor: Editor, error: SlateError) => {
            const { code, node } = error;
            if (
              code === "node_data_invalid" &&
              (Block.isBlock(node) || Inline.isInline(node))
            ) {
              const data = node.data.get(dataField);
              if (typeof data !== "number" || data < 0) {
                editor.withoutNormalizing(() =>
                  editor.setNodeByKey(node.key, {
                    data: node.data.delete(dataField)
                  })
                );
              } else {
                editor.withoutNormalizing(() =>
                  editor.setNodeByKey(node.key, {
                    data: node.data.set(dataField, maxIndentation)
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
