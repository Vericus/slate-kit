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
import Toolbar from "../toolbar";

const EnchancedEditor = compose(
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
    this.editor = React.createRef();
  }

  onChange = ({ value }) => {
    this.setState({
      value
    });
  };

  onPaste = (event, editor) => {
    const data = getEventTransfer(event);
    if (data.html) {
      const { origin, cleanedHTML } = editor.cleanHTML(data.html);
      const { document } = editor.deserializeHTML(cleanedHTML);
      editor.insertFragment(document);
      return true;
    }
  };

  renderToolbar = () => {
    if (this.editor && this.editor.current) {
      return (
        <Toolbar
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
            plugins={this.props.plugins}
            value={this.state.value}
            onChange={this.onChange}
            onPaste={this.onPaste}
            ref={this.editor}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}
