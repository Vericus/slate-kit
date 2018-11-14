import React, { Component } from "react";
import { compose, mapProps } from "recompose";
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
import Toolbar from "../toolbar";

const EnchancedEditor = compose(
  WithReadOnly,
  mapProps(({ forwardedRef, ...rest }) => ({ ref: forwardedRef, ...rest }))
)(Editor);

const EnchancedEditorWithRef = React.forwardRef(({ ...props }, ref) => (
  <EnchancedEditor {...props} forwardedRef={ref} />
));

export default class SlateKitEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Value.fromJSON(props.initialState)
    };
    this.pluginsWrapper = new PluginsWrapper();
    this.plugins = this.pluginsWrapper.makePlugins(this.props.pluginOpts);
    this.editor = React.createRef();
  }

  onChange = ({ value }) => {
    this.setState({
      value
    });
  };

  renderToolbar = () => {
    if (this.editor && this.editor.current) {
      return (
        <Toolbar
          pluginsWrapper={this.pluginsWrapper}
          onChange={this.onChange}
          isReadOnly={this.props.isReadOnly}
          editor={this.editor.current}
        />
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderToolbar()}
        <div className="editorContainer">
          <EnchancedEditorWithRef
            placeholder={"Enter some text..."}
            plugins={this.plugins}
            value={this.state.value}
            onChange={this.onChange}
            onPaste={this.onPaste}
            pluginsWrapper={this.pluginsWrapper}
            ref={this.editor}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}
