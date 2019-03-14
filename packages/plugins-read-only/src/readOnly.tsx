import isHotKey from "is-hotkey";
import { Plugin } from "slate";
import * as React from "react";

export default function ReadOnly(): Plugin {
  const COPY = isHotKey("mod+c");

  function onKeyDown(e, editor, next) {
    if (COPY(e)) return next();
    if (!editor.props.isReadOnly) return next();
    e.preventDefault();
    e.stopPropagation();
    return true;
  }

  function onBeforeInput(e, editor, next) {
    if (!editor.props.isReadOnly) return next();
    e.preventDefault();
    e.stopPropagation();
    return true;
  }

  function onDrop(e, editor, next) {
    if (!editor.props.isReadOnly) return next();
    e.preventDefault();
    e.stopPropagation();
    return true;
  }

  function onInput(e, editor, next) {
    if (!editor.props.isReadOnly) return next();
    e.preventDefault();
    e.stopPropagation();
    return true;
  }

  function onCut(e, editor, next) {
    if (!editor.props.isReadOnly) return next();
    e.preventDefault();
    e.stopPropagation();
    return true;
  }

  function renderEditor(props, editor, next) {
    const children = next();
    const childrenWithReadOnly = React.Children.map(children, child =>
      React.cloneElement(child, {
        spellCheck: editor.props.isReadOnly ? false : editor.props.spellCheck
      })
    );
    return <React.Fragment>{childrenWithReadOnly}</React.Fragment>;
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
