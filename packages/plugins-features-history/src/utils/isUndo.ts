import { Value } from "slate";

export default function isUndo(prevValue: Value, currValue: Value) {
  return prevValue.history.redos.size < currValue.history.redos.size;
}
