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

const findImgTag = str => {
  const imgIndex = str.indexOf("<img");
  let pointer = imgIndex + 1;
  while (pointer < str.length && str[pointer] !== ">") {
    pointer += 1;
  }
  return str.substring(imgIndex, pointer);
};

const findSrc = str => {
  const imgIndex = str.indexOf('src="');
  const start = imgIndex + 'src="'.length;
  let pointer = start;

  while (pointer < str.length && str[pointer] !== '"') {
    pointer += 1;
  }
  return str.substring(start, pointer);
};

const htmlToUrl = html => {
  const imgIndex = html.indexOf("<img");
  if (imgIndex < 0) return "";
  const imgTag = findImgTag(html);
  const src = findSrc(imgTag);
  return src;
};

const onDropPaste = (event, change) => {
  const transfer = getEventTransfer(event);
  const { type, files, html } = transfer;
  switch (type) {
    case "files":
      files.forEach(file => {
        insertNode(change, fileToUrl(file));
      });
      break;
    case "html":
      insertNode(change, htmlToUrl(html));
      break;
    default:
      break;
  }
  return undefined;
};

export default onDropPaste;
