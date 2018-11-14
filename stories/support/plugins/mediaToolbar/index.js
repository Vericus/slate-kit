import React from "react";
import Toolbar from "./Toolbar";

const createToolbar = mediaOptions => {
  const { mediaTypes } = mediaOptions;
  if (!mediaTypes) return;
  const mediaTypesOptions = Object.values(mediaTypes).reduce(
    (types, media) => [...types, media.type],
    []
  );
  return (props, editor, next) => {
    const { node } = props;
    if (editor.props.isReadOnly) return;
    if (!mediaTypesOptions.includes(node.type)) return next();
    const { value } = editor.props;
    const { selection } = value;
    const { start, end } = selection;
    const selectedMedia = editor.getSelectedMediaBlock(value);
    if (!selectedMedia) return;
    const src = editor.getSource(node);
    if (!src || src === "") return;
    if (!(start.isInNode(node) || end.isInNode(node))) return;
    return <Toolbar {...props} />;
  };
};

export default function createPlugin(opts) {
  const toolbar = createToolbar(opts);
  return {
    renderToolbar: toolbar
  };
}
