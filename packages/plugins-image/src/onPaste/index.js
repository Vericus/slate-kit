import validImageFormats from "../static/validImageFormats";

const onPaste = (event, change) => {
  // TODO: allow file paste

  const { items } = event.clipboardData;
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (!validImageFormats.includes(item.type)) return;
    const blobUrl = URL.createObjectURL(item.getAsFile());
    change.insertBlock({
      type: "image",
      isVoid: true,
      data: { src: blobUrl }
    });
  }
};

export default onPaste;
