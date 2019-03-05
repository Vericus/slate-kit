import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs/react";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import BasicTextFormatRenderer from "@vericus/slate-kit-basic-text-formatting-renderer";
import BasicTypography from "@vericus/slate-kit-basic-typhography";
import BasicTypographyRenderer from "@vericus/slate-kit-basic-typography-renderer";
import HistoryPlugin from "@vericus/slate-kit-history";
import Util from "@vericus/slate-kit-plugins-utils";
import Renderer from "@vericus/slate-kit-renderer";
import HTMLSerializer from "@vericus/slate-kit-html-serializer";
import PasteHelper from "@vericus/slate-kit-paste-helpers";
import ReadOnly from "@vericus/slate-kit-read-only";
import initialState from "../states/typography.json";
import Editor from "../support/components/editor";

const plugins = [
  ReadOnly(),
  PasteHelper(),
  HTMLSerializer(),
  Renderer(),
  Util(),
  HistoryPlugin(),
  BasicTextFormat({ renderer: BasicTextFormatRenderer }),
  BasicTypography({ renderer: BasicTypographyRenderer })
].flat();

storiesOf("plugins/features", module)
  .addDecorator(withKnobs)
  .add("Typography", () => {
    return (
      <Editor
        initialState={initialState}
        plugins={plugins}
        isReadOnly={boolean("ReadOnly", false)}
        spellCheck={boolean("SpellCheck", false)}
      />
    );
  });
