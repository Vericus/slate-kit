import React, { Component } from "react";
import PropTypes from "prop-types";
import hoistNonReactStatics from "hoist-non-react-statics";
import ReadOnly from "./readOnly";

function withReadOnly(WrappedComponent) {
  class WithReadOnly extends Component {
    static propTypes = {
      plugins: PropTypes.arrayOf(PropTypes.object).isRequired,
      isReadOnly: PropTypes.bool
    };

    static defaultProps = {
      isReadOnly: true
    };

    constructor(props) {
      super(props);
      this.readOnly = ReadOnly();
      this.plugins = props.isReadOnly
        ? [this.readOnly, ...this.props.plugins]
        : this.props.plugins;
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.isReadOnly !== nextProps.isReadOnly) {
        this.plugins = nextProps.isReadOnly
          ? [this.readOnly, ...nextProps.plugins]
          : nextProps.plugins;
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          spellCheck={false}
          plugins={this.plugins}
        />
      );
    }
  }
  return hoistNonReactStatics(WithReadOnly, WrappedComponent);
}

export default withReadOnly;
