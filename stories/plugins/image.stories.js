import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { Value } from "slate";
import { withKnobs, boolean } from "@storybook/addon-knobs/react";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import HistoryPlugin from "@vericus/slate-kit-history";
import Image from "@vericus/slate-kit-image";
import initialState from "../states/image.json";
import Editor from "../support/components/editor";

import NewImageRenderer from "../../packages/plugins-image/src/cadmus-components/CadmusImageRenderer";
import imageUpload from "../../packages/plugins-image/src/cadmus-components/imageUpload";

const customOptions = {
  // renderer: NewImageRenderer,
  // maxFileSize: 1000000,
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
