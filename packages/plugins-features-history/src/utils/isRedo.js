// @flow
import type { Value } from "slate";

export default function isRedo(prevValue: Value, currValue: Value) {
  return prevValue.history.redos.size > currValue.history.redos.size;
}
