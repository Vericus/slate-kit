import { Value } from "slate";

export default function hasRedo(editor, value?: Value) {
  const redos = value
    ? value.data.get("redos")
    : editor.value.data.get("redos");
  return !(
    redos &&
    redos
      .filter(
        (redo) => !(redo.size === 1 && redo.get(0).type === "set_selection")
      )
      .isEmpty()
  );
}
