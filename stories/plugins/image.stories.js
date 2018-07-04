import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { Value } from "slate";
import { withKnobs, boolean } from "@storybook/addon-knobs/react";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import HistoryPlugin from "@vericus/slate-kit-history";
import Image from "@vericus/slate-kit-image";
import initialState from "../states/image.json";
import Editor from "../support/components/editor";

const customOptions = {
  maxFileSize: 1000000,
  style: {
    backgroundColor: "grey",
    height: "15rem"
  },
  renderToolbar: ({ hovering, loading }, tools) => {
    return (
      <div>
        {tools.map(tool => <button onClick={tool.action}>{tool.name}</button>)}
      </div>
    );
  },
  renderSelect: (selectFile, deleteImage) => {
    return (
      <div>
        <button onClick={selectFile}>Select File</button>
        <button onClick={deleteImage}>Delete</button>
      </div>
    );
  },
  renderErrors: error => {
    return <div style={{ color: "red" }}>{error}</div>;
  },
  uploadImage: (file, updateSrc) => {
    let data = new FormData();
    data.append("file", file);

    fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: data,
      "Content-Type": file.type
    })
      .then(resp => {
        return resp.text();
      })
      .then(newUrl => {
        updateSrc(newUrl);
      });
  }
};

const pluginOpts = [
  {
    label: "history",
    createPlugin: HistoryPlugin
  },
  {
    label: "basic-text-format",
    createPlugin: BasicTextFormat
  },
  {
    label: "image",
    createPlugin: Image,
    options: customOptions
  }
];

storiesOf("plugins/features", module)
  .addDecorator(withKnobs)
  .add("Image", () => {
    return (
      <Editor
        initialState={initialState}
        pluginOpts={pluginOpts}
        isReadOnly={boolean("ReadOnly", false)}
        spellCheck={boolean("SpellCheck", false)}
      />
    );
  });
