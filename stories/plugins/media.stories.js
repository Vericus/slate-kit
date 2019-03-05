import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import BasicTextFormatRenderer from "@vericus/slate-kit-basic-text-formatting-renderer";
import BasicTypography from "@vericus/slate-kit-basic-typhography";
import BasicTypographyRenderer from "@vericus/slate-kit-basic-typography-renderer";
import HighlightText from "@vericus/slate-kit-highlight-text";
import HighlightRenderer from "@vericus/slate-kit-highlight-text-renderer";
import HistoryPlugin from "@vericus/slate-kit-history";
import MediaPlugin from "@vericus/slate-kit-media";
import MediaRenderer from "@vericus/slate-kit-media-renderer";
import Util from "@vericus/slate-kit-plugins-utils";
import Renderer from "@vericus/slate-kit-renderer";
import HTMLSerializer from "@vericus/slate-kit-html-serializer";
import PasteHelper from "@vericus/slate-kit-paste-helpers";
import ReadOnly from "@vericus/slate-kit-read-only";
import MediaToolbar from "../support/components/mediaToolbar";
import initialState from "../states/media.json";
import Editor from "../support/components/editor";

const plugins = [
  ReadOnly(),
  PasteHelper(),
  HTMLSerializer(),
  Renderer(),
  Util(),
  HistoryPlugin(),
  BasicTextFormat({ renderer: BasicTextFormatRenderer }),
  HighlightText({
    name: "Background",
    type: "textBackground",
    alpha: 0.4,
    data: "backgroundColor",
    defaultColor: "black",
    styles: ["backgroundColor"],
    renderer: HighlightRenderer
  }),
  HighlightText({
    name: "Text",
    type: "textColor",
    data: "color",
    defaultColor: "transparent",
    styles: ["textDecorationColor", "color"],
    renderer: HighlightRenderer
  }),
  BasicTypography({ renderer: BasicTypographyRenderer }),
  MediaPlugin({
    renderer: MediaRenderer,
    captionHideField: "hide",
    mediaTypes: {
      image: {
        onInsert: src => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(src);
            }, 5000);
          });
        }
      }
    },
    // eslint-disable-next-line react/display-name
    toolbarRenderer: props => <MediaToolbar {...props} />
  })
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
