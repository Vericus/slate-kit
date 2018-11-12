import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { Value } from "slate";
import { withKnobs, boolean } from "@storybook/addon-knobs/react";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import BasicTypography from "@vericus/slate-kit-basic-typhography";
import HistoryPlugin from "@vericus/slate-kit-history";
import PluginsWrapper from "@vericus/slate-kit-plugins-wrapper";
import Util from "@vericus/slate-kit-plugins-utils";
import initialState from "../states/typography.json";
import Editor from "../support/components/editor";

const pluginOpts = [
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
    label: "basic-typhography",
    createPlugin: BasicTypography
  }
];

storiesOf("plugins/features", module)
  .addDecorator(withKnobs)
  .add("Typography", () => {
    return (
      <Editor
        initialState={initialState}
        pluginOpts={pluginOpts}
        isReadOnly={boolean("ReadOnly", false)}
        spellCheck={boolean("SpellCheck", false)}
      />
    );
  });
