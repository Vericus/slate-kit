import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { Value } from "slate";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import HistoryPlugin from "@vericus/slate-kit-history";
import initialState from "../states/richText.json";
import Editor from "../support/components/editor";

const pluginOpts = [
  {
    label: "history",
    createPlugin: HistoryPlugin
  },
  {
    label: "basic-text-format",
    createPlugin: BasicTextFormat
  }
];

storiesOf("plugins/features", module).add("Rich Text", () => {
  return <Editor initialState={initialState} pluginOpts={pluginOpts} />;
});
