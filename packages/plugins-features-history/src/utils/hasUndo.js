export default function hasUndo(value) {
  return !(
    value.history.undos &&
    value.history.undos
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
