import { Change, Value } from "slate";

export default function removeCollapsedMark(
  value: Value,
  change: Change,
  type: string
): void {
  return (
    value.marks &&
    value.marks
      .filter(mark => mark.type === type)
      .forEach(mark => change.removeMark(mark))
  );
}
