import React, { Component } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";
import PluginsWrapper from "@vericus/slate-kit-plugins-wrapper";
import Toolbar from "../toolbar";

const pluginsWrapper = new PluginsWrapper();

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
    />
  );

  render() {
    return (
      <div>
        {this.renderToolbar()}
        <Editor
          placeholder={"Enter some text..."}
          plugins={this.plugins}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
