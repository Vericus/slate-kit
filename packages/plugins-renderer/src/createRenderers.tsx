import * as React from "react";
import PluginsWrapper from "@vericus/slate-kit-plugins-wrapper";
import Options, { TypeOptions } from "./options";

export interface Props {
  children: (...args: any[]) => JSX.Element;
}

const SlateKitNode: React.SFC<Props> = props => props.children(props);

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
  pluginsWrapper: PluginsWrapper
) => props => {
  const newProps = pluginsWrapper.getProps(props);
  return (
    <SlateKitNode>
      {() =>
        nodesOptions[props.node.type]
          ? nodesOptions[props.node.type](newProps)
          : nodesOptions.default
            ? nodesOptions.default(newProps)
            : undefined
      }
    </SlateKitNode>
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
  const { marks, nodes, placeholders } = opts;
  const renderMark = createRenderMarks(marks, pluginsWrapper);
  const renderNode = createRenderNodes(nodes, pluginsWrapper);
  const renderPlaceholders = createRenderPlaceholders(placeholders);
  return [renderPlaceholders, { renderMark, renderNode }];
};

export default function createRenderers(opts, pluginsWrapper: PluginsWrapper) {
  let options = opts;
  let defaultNodeRenderer;
  if (pluginsWrapper) {
    const renderers = pluginsWrapper.getRenderers();
    const mapping = pluginsWrapper.getNodeMappings();
    defaultNodeRenderer = mapping.nodes.default;
    options = {
      ...options,
      ...Object.entries(renderers).reduce(
        (mapRenderers, [key, value]) => {
          return {
            ...mapRenderers,
            [key]: Array.isArray(value)
              ? [...mapRenderers[key], ...value]
              : {
                  ...mapRenderers[key],
                  ...Object.entries(value).reduce(
                    (acc, [mapKey, mapRenderer]) => {
                      return {
                        ...acc,
                        [mapping[key][mapKey]]: mapRenderer
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
          placeholders: []
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
