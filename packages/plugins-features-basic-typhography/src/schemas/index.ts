import { Block, Change, SlateError } from "slate";
import { TypeOptions } from "../options";

export default function createSchema(opts: TypeOptions) {
  const { blockTypes } = opts;
  return {
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
