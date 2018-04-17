import React, { Component } from "react";
import { Editor } from "slate-react";
import { storiesOf } from "@storybook/react";
import { Value } from "slate";
import Debug from "debug";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import HighlightText from "@vericus/slate-kit-highlight-text";
import HistoryPlugin from "@vericus/slate-kit-history";
import PluginsWrapper from "@vericus/slate-kit-plugins-wrapper";
import initialState from "../states/highlightedText.json";

const debug = Debug("slate-kit:stories:HighlightedText");

const pluginsWrapper = new PluginsWrapper();

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
    label: "colored-text",
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
    label: "background-colored-text",
    createPlugin: HighlightText,
    options: {
      type: "textColor",
      data: "color",
      defaultColor: "transparent",
      styles: ["textDecorationColor", "color"]
    }
  }
];

const plugins = pluginsWrapper.makePlugins(pluginOpts);

class ColoredTextStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Value.fromJSON(initialState)
    };
  }

  onChange = ({ value }) => {
    this.setState({
      value
    });
  };

  render() {
    return (
      <div>
        <Editor
          placeholder={"Enter some text..."}
          plugins={plugins}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

storiesOf("plugins/features", module).add("Colored Text", () => {
  return <ColoredTextStory />;
});
