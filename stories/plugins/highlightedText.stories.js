import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { Value } from "slate";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import BasicTypography from "@vericus/slate-kit-basic-typhography";
import HighlightText from "@vericus/slate-kit-highlight-text";
import HistoryPlugin from "@vericus/slate-kit-history";
import Util from "@vericus/slate-kit-plugins-utils";
import Renderer from "@vericus/slate-kit-renderer";
import initialState from "../states/highlightedText.json";
import Editor from "../support/components/editor";

const pluginOpts = [
  { label: "renderer", createPlugin: Renderer },
  { label: "util", createPlugin: Util },
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
      name: "Background",
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
      name: "Text",
      type: "textColor",
      data: "color",
      defaultColor: "transparent",
      styles: ["textDecorationColor", "color"]
    }
  },
  {
    label: "basic-typhography",
    createPlugin: BasicTypography
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
        spellCheck={boolean("SpellCheck", false)}
      />
    );
  });
