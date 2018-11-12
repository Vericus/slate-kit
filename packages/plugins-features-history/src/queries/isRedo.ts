import { Value } from "slate";

export default function isRedo(prevValue: Value, currValue: Value) {
  const currRedos = currValue.data.get("redos");
  const prevRedos = prevValue.data.get("redos");
  return prevRedos.size > currRedos.size;
}
