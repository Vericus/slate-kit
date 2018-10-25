import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { Value } from "slate";
import { withKnobs, boolean } from "@storybook/addon-knobs/react";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import BasicTypography from "@vericus/slate-kit-basic-typhography";
import HighlightText from "@vericus/slate-kit-highlight-text";
import HistoryPlugin from "@vericus/slate-kit-history";
import IndentPlugin from "@vericus/slate-kit-indent";
import ListPlugin from "@vericus/slate-kit-indentable-list";
import AlignPlugin from "@vericus/slate-kit-align";
import PluginsWrapper from "@vericus/slate-kit-plugins-wrapper";
import MediaPlugin from "@vericus/slate-kit-media";
import MediaToolbar from "./support/plugins/mediaToolbar";
import initialState from "./states/fullText.json";
import Editor from "./support/components/editor";

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
    label: "basic-typhography",
    createPlugin: BasicTypography
  },
  {
    label: "colored-text",
    createPlugin: HighlightText,
    options: {
      type: "textColor",
      data: "color",
      defaultColor: "black",
      styles: ["textDecorationColor", "color"]
    }
  },
  {
    label: "media",
    createPlugin: MediaPlugin,
    options: {
      captionHideField: "hide",
      mediaTypes: {
        image: {
          onInsert: src => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(src);
              }, 5000);
            });
          }
        }
      }
    }
  },
  {
    label: "background-colored-text",
    createPlugin: HighlightText,
    options: {
      type: "textBackground",
      alpha: 0.54,
      data: "backgroundColor",
      defaultColor: "transparent",
      styles: ["backgroundColor"]
    }
  },
  {
    label: "list",
    createPlugin: ListPlugin
  },
  {
    label: "indent",
    createPlugin: IndentPlugin
  },
  {
    label: "align",
    createPlugin: AlignPlugin
  }
];

storiesOf("editor", module)
  .addDecorator(withKnobs)
  .add("Full Featured", () => {
    return (
      <Editor
        initialState={initialState}
        pluginOpts={pluginOpts}
        isReadOnly={boolean("ReadOnly", false)}
        spellCheck={boolean("SpellCheck", false)}
      />
    );
  });
