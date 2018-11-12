import { Block, SlateError, Document, Editor } from "slate";
import { TypeOptions } from "../options";

export default function createSchema(opts: TypeOptions) {
  const { blockTypes, defaultBlock } = opts;
  return {
    document: {
      last: Object.values(blockTypes).map(type => ({ type })),
      normalize: (editor: Editor, error: SlateError) => {
        switch (error.code) {
          case "last_child_type_invalid":
            const paragraph = Block.create(defaultBlock);
            if (Document.isDocument(error.node)) {
              editor.insertNodeByKey(
                error.node.key,
                error.node.nodes.size,
                paragraph
              );
            }
            return;
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
                    return;
                  case "parent_object_invalid":
                    editor.unwrapBlockByKey(error.node.key);
                    return;
                  default:
                    return;
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
