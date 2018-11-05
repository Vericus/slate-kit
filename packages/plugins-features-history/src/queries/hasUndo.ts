import { Value } from "slate";

export default function hasUndo(value: Value) {
  const undos = value.data.get("undos");
  return !(
    undos &&
    undos
      .filter(
        undo =>
          !(
            undo.size === 1 &&
            (undo.get(0).type === "set_selection" ||
              undo.get(0).type === "set_value")
          )
      )
      .isEmpty()
  );
}
