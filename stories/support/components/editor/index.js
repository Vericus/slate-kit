import React, { Component } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import PluginsWrapper from "@vericus/slate-kit-plugins-wrapper";
import { WithReadOnly } from "@vericus/slate-kit-read-only";
import HistoryPlugin from "@vericus/slate-kit-history";
import Toolbar from "../toolbar";

const pluginsWrapper = new PluginsWrapper();

const EditorWithReadOnly = WithReadOnly(Editor);

export default class SlateKitEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Value.fromJSON(props.initialState)
    };
    this.plugins = pluginsWrapper.makePlugins(this.props.pluginOpts);
  }

  onChange = ({ value }) => {
    this.setState({
      value
    });
  };

  renderToolbar = () => (
    <Toolbar
      pluginsWrapper={pluginsWrapper}
      value={this.state.value}
      onChange={this.onChange}
      isReadOnly={this.props.isReadOnly}
    />
  );

  render() {
    return (
      <div>
        {this.renderToolbar()}
        <EditorWithReadOnly
          placeholder={"Enter some text..."}
          plugins={this.plugins}
          value={this.state.value}
          onChange={this.onChange}
          {...this.props}
        />
      </div>
    );
  }
}
