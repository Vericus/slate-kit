import { Block, Change, SlateError, Document } from "slate";
import { TypeOptions } from "../options";

export default function createSchema(opts: TypeOptions) {
  const { blockTypes } = opts;
  return {
    document: {
      last: Object.values(blockTypes).map(type => ({ type })),
      normalize: (change: Change, error: SlateError) => {
        switch (error.code) {
          case "last_child_type_invalid":
            const paragraph = Block.create("paragraph");
            if (Document.isDocument(error.node)) {
              change.insertNodeByKey(
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
              normalize: (change: Change, error: SlateError) => {
                switch (error.code) {
                  case "child_object_invalid":
                    change.removeNodeByKey(error.child.key);
                    return;
                  case "parent_object_invalid":
                    change.unwrapBlockByKey(error.node.key);
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
