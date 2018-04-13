// @flow
import type { Value } from "slate";

export default function hasMark(value: Value, type: string): boolean {
  return value.marks && value.marks.some(mark => mark.type === type);
}
