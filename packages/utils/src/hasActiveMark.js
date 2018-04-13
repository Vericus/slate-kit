// @flow
import type { Value } from "slate";

export default function hasActiveMark(value: Value, type: string): boolean {
  return (
    value.activeMarks && value.activeMarks.some(mark => mark.type === type)
  );
}
