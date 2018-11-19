import isHotKey from "is-hotkey";
import * as React from "react";

export default function ReadOnly() {
  const COPY = isHotKey("mod+c");

  function onKeyDown(e, editor, next) {
    if (COPY(e)) return next();
    if (!editor.props.isReadOnly) return next();
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  function onBeforeInput(e, editor, next) {
    if (!editor.props.isReadOnly) return next();
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  function onDrop(e, editor, next) {
    if (!editor.props.isReadOnly) return next();
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  function onInput(e, editor, next) {
    if (!editor.props.isReadOnly) return next();
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  function onCut(e, editor, next) {
    if (!editor.props.isReadOnly) return next();
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  function renderEditor(props, editor, next) {
    const children = next();
    const childrenWithReadOnly = React.Children.map(children, child =>
      React.cloneElement(child, {
        spellCheck: editor.props.isReadOnly ? false : editor.props.spellCheck
      })
    );
    return <React.Fragment>{childrenWithReadOnly}></React.Fragment>;
  }

  return {
    renderEditor,
    onInput,
    onDrop,
    onKeyDown,
    onBeforeInput,
    onCut
  };
}
