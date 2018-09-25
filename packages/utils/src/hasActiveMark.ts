import { Value } from "slate";

export default function hasActiveMark(value: Value, type: string): boolean {
  return (
    value.selection &&
    value.selection.isFocused &&
    value.activeMarks &&
    value.activeMarks.some(mark => !!(mark && mark.type === type))
  );
}
