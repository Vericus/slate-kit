import { Block, SlateError, Document, Editor, Text } from "slate";
import { TypeOptions } from "../options";

export default function createSchema(opts: TypeOptions) {
  const { blockTypes, defaultBlock } = opts;
  return {
    document: {
      last: Object.values(blockTypes).map(type => ({ type })),
      normalize: (editor: Editor, error: SlateError) => {
        const { code, node } = error;
        const paragraph = Block.create({
          type: defaultBlock,
          nodes: [Text.create("")]
        });
        switch (code) {
          case "last_child_type_invalid":
            if (Document.isDocument(node)) {
              editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
            }
            break;
          default:
            break;
        }
      }
    },
    blocks: {
      ...Object.values(blockTypes).reduce((acc, type) => {
        if (typeof type === "string") {
          return {
            ...acc,
            [type]: {
              isVoid: false,
              parent: { object: "document" },
              nodes: [{ match: [{ object: "text" }, { object: "inline" }] }],
              normalize: (editor: Editor, error: SlateError) => {
                switch (error.code) {
                  case "child_object_invalid":
                    editor.removeNodeByKey(error.child.key);
                    break;
                  case "parent_object_invalid":
                    editor.unwrapBlockByKey(error.node.key);
                    break;
                  default:
                    break;
                }
              }
            }
          };
        }
        return acc;
      }, {})
    }
  };
}
