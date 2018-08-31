import { Change, Value } from "slate";

export default function removeCollapsedMark(
  value: Value,
  change: Change,
  type: string
): any {
  return (
    value.marks &&
    value.marks
      .filter(mark => !(mark && mark.type === type))
      .forEach(mark => mark && change.removeMark(mark))
  );
}
