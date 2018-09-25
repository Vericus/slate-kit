import * as React from "react";
import { hoistStatics } from "recompose";
import PluginsWrapper from "@vericus/slate-kit-plugins-wrapper";
import CreateRenderers from "./createRenderers";

export interface Props {
  plugins: object[];
  pluginsWrapper: PluginsWrapper;
}

function withRenderers(WrappedComponent) {
  class WithRenderers extends React.Component<Props> {
    plugins: object[];
    constructor(props) {
      super(props);
      const { pluginsWrapper } = this.props;
      const { plugins: rendererPlugins } = CreateRenderers({}, pluginsWrapper);
      this.plugins = [...this.props.plugins, ...rendererPlugins];
    }

    render() {
      return <WrappedComponent {...this.props} plugins={this.plugins} />;
    }
  }

  return WithRenderers;
}

export default hoistStatics(withRenderers);
