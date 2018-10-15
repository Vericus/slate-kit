import * as React from "react";
import PluginsWrapper from "@vericus/slate-kit-plugins-wrapper";
import { compose } from "recompose";
import Options, { TypeOptions } from "./options";

export interface Props {
  children: (...args: any[]) => JSX.Element;
}

const SlateKitNode: React.SFC<Props> = props => props.children(props);

const createRenderToolbar = (
  toolbarOptions,
  pluginsWrapper: PluginsWrapper
) => props => {
  let result = null;
  toolbarOptions.some(renderer => {
    return renderer(props) ? ((result = renderer(props)), true) : false;
  });
  return result;
};

const defaultMark = props => (
  <span {...props.attributes}>{props.children}</span>
);

const createRenderMarks = (
  marksOptions,
  pluginsWrapper: PluginsWrapper
) => props => {
  const newProps = pluginsWrapper.getProps(props);
  return (
    <SlateKitNode>
      {() =>
        marksOptions[props.mark.type]
          ? marksOptions[props.mark.type](newProps)
          : defaultMark(newProps)
      }
    </SlateKitNode>
  );
};
const createRenderNodes = (
  nodesOptions,
  renderToolbar,
  pluginsWrapper: PluginsWrapper
) => props => {
  const newProps = pluginsWrapper.getProps(props);
  return (
    <React.Fragment>
      {renderToolbar(props)}
      <SlateKitNode>
        {() =>
          nodesOptions[props.node.type]
            ? nodesOptions[props.node.type](newProps)
            : nodesOptions.default && props.node.object === "block"
              ? nodesOptions.default(newProps)
              : undefined
        }
      </SlateKitNode>
    </React.Fragment>
  );
};

const placeholderStyle: React.CSSProperties = {
  pointerEvents: "none",
  display: "inline-block",
  whiteSpace: "nowrap",
  opacity: 0.333,
  float: "left",
  position: "relative",
  width: "100%"
};

const createRenderPlaceholders = placeholdersOptions => {
  return {
    renderPlaceholder: props => {
      const placeholder = placeholdersOptions.find(option => {
        return option.condition(props);
      });
      if (!placeholder) return;
      return (
        <span
          contentEditable={false}
          style={placeholderStyle}
          className="placeholder"
        >
          {placeholder.render(props)}
        </span>
      );
    }
  };
};

const renderers = (opts: TypeOptions, pluginsWrapper: PluginsWrapper) => {
  const { marks, nodes, placeholders, toolbars } = opts;
  const renderToolbar = createRenderToolbar(toolbars, pluginsWrapper);
  const renderMark = createRenderMarks(marks, pluginsWrapper);
  const renderNode = createRenderNodes(nodes, renderToolbar, pluginsWrapper);
  const renderPlaceholders = createRenderPlaceholders(placeholders);
  return [renderPlaceholders, { renderMark, renderNode }];
};

export default function createRenderers(opts, pluginsWrapper: PluginsWrapper) {
  let options = opts;
  let defaultNodeRenderer;
  if (pluginsWrapper) {
    const renderersDefinition = pluginsWrapper.getRenderers();
    const mapping = pluginsWrapper.getNodeMappings();
    const hocs = pluginsWrapper.getRenderersHOC();
    defaultNodeRenderer = mapping.nodes.default;
    options = {
      ...options,
      ...Object.entries(renderersDefinition).reduce(
        (mapRenderers, [key, value]) => {
          return {
            ...mapRenderers,
            [key]: Array.isArray(value)
              ? [...mapRenderers[key], ...value]
              : {
                  ...mapRenderers[key],
                  ...Object.entries(value).reduce(
                    (acc, [mapKey, mapRenderer]) => {
                      let enhancedMapRenderer = mapRenderer;
                      const nodeHocs = hocs && hocs[mapKey];
                      if (nodeHocs && Array.isArray(nodeHocs)) {
                        enhancedMapRenderer = nodeHocs.reduce(
                          (render, hoc) => compose(hoc)(render),
                          enhancedMapRenderer
                        );
                      }
                      return {
                        ...acc,
                        [mapping[key][mapKey]]: enhancedMapRenderer
                      };
                    },
                    {}
                  )
                }
          };
        },
        {
          marks: {},
          nodes: {},
          placeholders: [],
          toolbars: []
        }
      )
    };
  }
  if (defaultNodeRenderer) {
    options = {
      ...options,
      nodes: {
        ...options.nodes,
        default: options.nodes[defaultNodeRenderer]
      }
    };
  }
  const pluginOptions = new Options(options);
  return {
    plugins: [...renderers(pluginOptions, pluginsWrapper)]
  };
}
