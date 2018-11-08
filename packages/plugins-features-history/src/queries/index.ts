import hasRedo from "./hasRedo";
import hasUndo from "./hasUndo";
import isRedo from "./isRedo";
import isUndo from "./isUndo";

export default function createQueries() {
  return {
    hasRedo,
    hasUndo,
    isRedo: (editor, prevValue, currValue) => isRedo(prevValue, currValue),
    isUndo: (editor, prevValue, currValue) => isUndo(prevValue, currValue)
  };
}
