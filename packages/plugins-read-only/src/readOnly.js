import isHotKey from "is-hotkey";

export default function ReadOnly() {
  const COPY = isHotKey("mod+c");

  function onKeyDown(e) {
    if (COPY(e)) return undefined;

    e.preventDefault();
    e.stopPropagation();
    return true;
  }

  function onBeforeInput(e) {
    e.preventDefault();
    e.stopPropagation();
    return true;
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    return true;
  }

  function onInput(e) {
    e.preventDefault();
    e.stopPropagation();
    return true;
  }

  function onCut(e) {
    e.preventDefault();
    e.stopPropagation();
    return true;
  }

  return {
    onInput,
    onDrop,
    onKeyDown,
    onBeforeInput,
    onCut
  };
}
