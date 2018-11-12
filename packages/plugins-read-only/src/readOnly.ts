import isHotKey from "is-hotkey";

export default function ReadOnly() {
  const COPY = isHotKey("mod+c");

  function onKeyDown(e) {
    if (COPY(e)) return undefined;

    e.preventDefault();
    e.stopPropagation();
    return;
  }

  function onBeforeInput(e) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  function onInput(e) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  function onCut(e) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  return {
    onInput,
    onDrop,
    onKeyDown,
    onBeforeInput,
    onCut
  };
}
