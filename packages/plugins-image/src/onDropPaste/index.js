import { getEventTransfer } from "slate-react";
import validImageFormats from "../static/validImageFormats";

const insertNode = (change, src) => {
  if (!src) return;
  change.insertBlock({
    type: "image",
    isVoid: true,
    data: { src }
  });
};

const fileToUrl = file => {
  if (!validImageFormats.includes(file.type)) return "";
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
};

const onDropPaste = (event, change) => {
  const transfer = getEventTransfer(event);
  const { type, files } = transfer;
  switch (type) {
    case "files":
      files.forEach(file => {
        insertNode(change, fileToUrl(file));
      });
      break;
    default:
      break;
  }
  return undefined;
};

export default onDropPaste;
