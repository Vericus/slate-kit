import { Editor, Value } from "slate";
import hasRedo from "./hasRedo";
import hasUndo from "./hasUndo";
import isRedo from "./isRedo";
import isUndo from "./isUndo";

export default function createQueries() {
  return {
    hasRedo,
    hasUndo,
    isRedo: (editor: Editor, prevValue: Value, currValue: Value) =>
      isRedo(prevValue, currValue),
    isUndo: (editor: Editor, prevValue: Value, currValue: Value) =>
      isUndo(prevValue, currValue),
  };
}
