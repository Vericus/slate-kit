import { Value } from "slate";

export default function isUndo(prevValue: Value, currValue: Value) {
  const currUndos = currValue.data.get("undos");
  const prevUndos = prevValue.data.get("undos");
  return prevUndos.size > currUndos.size;
}
