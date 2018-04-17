import React, { Component } from "react";
import { Editor } from "slate-react";
import { storiesOf } from "@storybook/react";
import { Value } from "slate";
import Debug from "debug";
import BasicTextFormat from "@vericus/slate-kit-basic-text-formatting";
import BasicTypography from "@vericus/slate-kit-basic-typhography";
import HistoryPlugin from "@vericus/slate-kit-history";
import PluginsWrapper from "@vericus/slate-kit-plugins-wrapper";
import initialState from "../states/typography.json";

const debug = Debug("slate-kit:stories:RichText");

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
    label: "basic-typhography",
    createPlugin: BasicTypography
  }
];

const plugins = pluginsWrapper.makePlugins(pluginOpts);

class TypographyStory extends Component {
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

storiesOf("plugins/features", module).add("Typography", () => {
  return <TypographyStory />;
});
