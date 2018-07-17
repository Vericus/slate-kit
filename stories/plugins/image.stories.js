import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { Value } from "slate";
import { withKnobs, boolean } from "@storybook/addon-knobs/react";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import HistoryPlugin from "@vericus/slate-kit-history";
import Image from "@vericus/slate-kit-image";
import initialState from "../states/image.json";
import Editor from "../support/components/editor";

import CustomImageRenderer from "../support/components/image/CustomImageRenderer";
import imageUpload from "../support/components/image/imageUpload";

const customOptions = {
  renderer: CustomImageRenderer,
  maxFileSize: 5000000
  // uploadImage: imageUpload
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
