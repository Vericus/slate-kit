import React from "react";
import Toolbar from "./Toolbar";

const createToolbar = (mediaLabel, pluginsWrapper) => {
  const mediaOptions = pluginsWrapper.getOptions(mediaLabel);
  const changes = pluginsWrapper.getChanges(mediaLabel);
  const utils = pluginsWrapper.getUtils(mediaLabel);
  if (!mediaOptions) return;
  const { mediaTypes } = mediaOptions;
  if (!mediaTypes) return;
  const mediaTypesOptions = Object.values(mediaTypes).reduce(
    (types, media) => [...types, media.type],
    []
  );
  return props => {
    const { node, editor } = props;
    if (!mediaTypesOptions.includes(node.type)) return;
    const { value } = editor.props;
    const { selection } = value;
    const { start, end } = selection;
    const selectedMedia = utils.getSelectedMediaBlock(value);
    if (!selectedMedia) return;
    if (!(start.isInNode(node) || end.isInNode(node))) return;
    return <Toolbar {...props} changes={changes} />;
  };
};

export default function createPlugin(opts, pluginsWrapper) {
  const { mediaLabel } = opts;
  const toolbar = createToolbar(mediaLabel, pluginsWrapper);
  return {
    renderers: {
      toolbars: [...(toolbar ? [toolbar] : [])]
    }
  };
}
