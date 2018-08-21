import * as React from "react";
import { Component } from "react";
import * as PropTypes from "prop-types";
import hoistNonReactStatics from "hoist-non-react-statics";
import ReadOnly from "./readOnly";

interface Props {
  plugins: object[];
  isReadOnly: boolean;
  spellCheck: boolean;
}

function withReadOnly(WrappedComponent) {
  class WithReadOnly extends Component<Props> {
    static propTypes = {
      plugins: PropTypes.arrayOf(PropTypes.object).isRequired,
      isReadOnly: PropTypes.bool,
      spellCheck: PropTypes.bool
    };

    static defaultProps = {
      isReadOnly: true,
      spellCheck: false
    };

    readOnly: object;
    plugins: object[];

    constructor(props: Props) {
      super(props);
      this.readOnly = ReadOnly();
      this.plugins = this.props.isReadOnly
        ? [this.readOnly, ...this.props.plugins]
        : this.props.plugins;
    }

    componentWillReceiveProps(nextProps: Props) {
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
          spellCheck={this.props.spellCheck && !this.props.isReadOnly}
          plugins={this.plugins}
        />
      );
    }
  }
  return hoistNonReactStatics(WithReadOnly, WrappedComponent);
}

export default withReadOnly;
