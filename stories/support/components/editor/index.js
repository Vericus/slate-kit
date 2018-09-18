import React, { Component } from "react";
import { compose } from "recompose";
import {
  getEventRange,
  getEventTransfer,
  setEventTransfer,
  findNode,
  findDOMNode,
  Editor
} from "slate-react";
import { Value } from "slate";
import PluginsWrapper from "@vericus/slate-kit-plugins-wrapper";
import { WithReadOnly } from "@vericus/slate-kit-read-only";
import { WithRenderers } from "@vericus/slate-kit-renderer";
import HistoryPlugin from "@vericus/slate-kit-history";
import pasteCleaner from "@vericus/slate-kit-paste-helpers";
import Toolbar from "../toolbar";

const EnchancedEditor = compose(
  WithReadOnly,
  WithRenderers
)(Editor);

export default class SlateKitEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Value.fromJSON(props.initialState)
    };
    this.pluginsWrapper = new PluginsWrapper();
    this.plugins = this.pluginsWrapper.makePlugins(this.props.pluginOpts);
  }

  onChange = ({ value }) => {
    this.setState({
      value
    });
  };

  onPaste = (event, change) => {
    const data = getEventTransfer(event);
    if (data.html) {
      const { origin, cleanedHTML } = pasteCleaner(data.html);
      const parser = pluginsWrapper.getSerializer();
      const { document } = parser.deserialize(cleanedHTML);
      change.insertFragment(document);
      return true;
    }
  };

  renderToolbar = () => (
    <Toolbar
      pluginsWrapper={this.pluginsWrapper}
      value={this.state.value}
      onChange={this.onChange}
      isReadOnly={this.props.isReadOnly}
    />
  );

  render() {
    return (
      <div>
        {this.renderToolbar()}
        <div className="editorContainer">
          <EnchancedEditor
            placeholder={"Enter some text..."}
            plugins={this.plugins}
            value={this.state.value}
            onChange={this.onChange}
            onPaste={this.onPaste}
            pluginsWrapper={this.pluginsWrapper}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}
