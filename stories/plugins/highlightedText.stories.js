import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { Value } from "slate";
import { withKnobs, boolean } from "@storybook/addon-knobs/react";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import HighlightText from "@vericus/slate-kit-highlight-text";
import HistoryPlugin from "@vericus/slate-kit-history";
import initialState from "../states/highlightedText.json";
import Editor from "../support/components/editor";

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
    label: "background-colored-text",
    createPlugin: HighlightText,
    options: {
      type: "textBackground",
      alpha: 0.4,
      data: "backgroundColor",
      defaultColor: "black",
      styles: ["backgroundColor"]
    }
  },
  {
    label: "colored-text",
    createPlugin: HighlightText,
    options: {
      type: "textColor",
      data: "color",
      defaultColor: "transparent",
      styles: ["textDecorationColor", "color"]
    }
  }
];

storiesOf("plugins/features", module)
  .addDecorator(withKnobs)
  .add("Colored Text", () => {
    return (
      <Editor
        initialState={initialState}
        pluginOpts={pluginOpts}
        isReadOnly={boolean("ReadOnly", false)}
      />
    );
  });
