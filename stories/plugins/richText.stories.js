import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { Value } from "slate";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import BasicTypography from "@vericus/slate-kit-basic-typhography";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import HistoryPlugin from "@vericus/slate-kit-history";
import Util from "@vericus/slate-kit-plugins-utils";
import Renderer from "@vericus/slate-kit-renderer";
import HTMLSerializer from "@vericus/slate-kit-html-serializer";
import PasteHelper from "@vericus/slate-kit-paste-helpers";
import initialState from "../states/richText.json";
import Editor from "../support/components/editor";

const plugins = [
  HTMLSerializer(),
  Renderer(),
  Util(),
  HistoryPlugin(),
  BasicTextFormat(),
  BasicTypography()
].flat();

storiesOf("plugins/features", module)
  .addDecorator(withKnobs)
  .add("Rich Text", () => {
    return (
      <Editor
        initialState={initialState}
        plugins={plugins}
        isReadOnly={boolean("ReadOnly", false)}
        spellCheck={boolean("SpellCheck", false)}
      />
    );
  });
