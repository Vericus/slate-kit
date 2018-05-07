// @flow
import type { Value, Change, Block } from "slate";
import { Data } from "slate";
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { type typeOptions } from "./options";

export default function createChanges(opts: typeOptions) {
  const { indentable, maxIndentation } = opts;
  const indentableBlocks = (value: Value) => {
    return getHighestSelectedBlocks(value).filter(block =>
      indentable.includes(block.type)
    );
  };
  const increaseBlockIndent = (change: Change, block: Block) => {
    const indentLevel = block.data.get("indentation") || 0;
    if (indentLevel + 1 > maxIndentation) return;
    change.setNodeByKey(block.key, {
      data: Data.fromJSON({
        ...block.data.toJSON(),
        indentation: indentLevel + 1
      })
    });
  };
  const decreaseBlockIndent = (change: Change, block: Block) => {
    const indentLevel = block.data.get("indentation") || 0;
    if (indentLevel === 0) return;
    const newData = {
      ...block.data.toJSON(),
      indentation: indentLevel - 1
    };
    if (newData.indentation === 0) {
      delete newData.indentation;
    }
    change.setNodeByKey(block.key, {
      data: Data.fromJSON(newData)
    });
  };
  return {
    increaseIndent: (change: Change) => {
      const { value } = change;
      indentableBlocks(value).forEach(block =>
        increaseBlockIndent(change, block)
      );
    },
    decreaseIndent: (change: Change) => {
      const { value } = change;
      indentableBlocks(value).forEach(block =>
        decreaseBlockIndent(change, block)
      );
    }
  };
}
