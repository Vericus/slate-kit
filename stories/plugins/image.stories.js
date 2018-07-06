import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { Value } from "slate";
import { withKnobs, boolean } from "@storybook/addon-knobs/react";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import HistoryPlugin from "@vericus/slate-kit-history";
import Image from "@vericus/slate-kit-image";
import initialState from "../states/image.json";
import Editor from "../support/components/editor";

class NewImageRenderer extends React.Component {
  renderToolbar = () => {
    const { isSelected, loading, src, actions } = this.props;
    const { deleteImage, selectFile } = actions;
    const tools = [
      {
        name: "delete",
        action: deleteImage
      },
      {
        name: "re-upload",
        action: selectFile
      }
    ];
    return (
      isSelected &&
      src && (
        <div style={{ position: "absolute" }}>
          {tools.map(tool => (
            <button onMouseDown={tool.action}>{tool.name}</button>
          ))}
        </div>
      )
    );
  };

  renderSelect = () => {
    const { selectFile, deleteImage } = this.props.actions;
    return (
      !this.props.src && (
        <div>
          <button onClick={selectFile}>Select File</button>
          <button onClick={deleteImage}>Delete</button>
        </div>
      )
    );
  };

  renderError = () => {
    const { error } = this.props;
    return <div style={{ color: "red" }}>{error}</div>;
  };

  render() {
    return (
      <div>
        {this.renderToolbar()}
        {this.renderSelect()}
        {this.renderError()}
      </div>
    );
  }
}

const customOptions = {
  renderer: NewImageRenderer,
  maxFileSize: 1000000,
  uploadImage: (file, updateSrc, updateErrors) => {
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
      })
      .catch(e => {
        updateSrc();
        updateErrors("Failed to upload file to server");
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
