import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { Value } from "slate";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import BasicTypography from "@vericus/slate-kit-basic-typhography";
import HighlightText from "@vericus/slate-kit-highlight-text";
import HistoryPlugin from "@vericus/slate-kit-history";
import MediaPlugin from "@vericus/slate-kit-media";
import Util from "@vericus/slate-kit-plugins-utils";
import Renderer from "@vericus/slate-kit-renderer";
import HTMLSerializer from "@vericus/slate-kit-html-serializer";
import PasteHelper from "@vericus/slate-kit-paste-helpers";
import MediaToolbar from "../support/plugins/mediaToolbar";
import initialState from "../states/media.json";
import Editor from "../support/components/editor";

const media = MediaPlugin({
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
});

const plugins = [
  PasteHelper(),
  HTMLSerializer(),
  Renderer(),
  Util(),
  HistoryPlugin(),
  BasicTextFormat(),
  HighlightText({
    name: "Background",
    type: "textBackground",
    alpha: 0.4,
    data: "backgroundColor",
    defaultColor: "black",
    styles: ["backgroundColor"]
  }),
  HighlightText({
    name: "Text",
    type: "textColor",
    data: "color",
    defaultColor: "transparent",
    styles: ["textDecorationColor", "color"]
  }),
  BasicTypography(),
  media,
  MediaToolbar(media[0].options)
].flat();

storiesOf("plugins/features", module)
  .addDecorator(withKnobs)
  .add("Media", () => {
    return (
      <Editor
        initialState={initialState}
        plugins={plugins}
        isReadOnly={boolean("ReadOnly", false)}
        spellCheck={boolean("SpellCheck", false)}
      />
    );
  });
