export default function hasRedo(value) {
  return !(
    value.history.redos &&
    value.history.redos
      .filter(
        redo => !(redo.size === 1 && redo.get(0).type === "set_selection")
      )
      .isEmpty()
  );
}
