import Symbol from "es6-symbol";

const CHANGES = Symbol("changes");
const OPTIONS = Symbol("options");
const PLUGINS = Symbol("plugins");
const PROPS = Symbol("props");
const STYLES = Symbol("styles");
const UTILS = Symbol("utils");

export default class PluginsWrapper {
  constructor() {
    this[CHANGES] = {};
    this[OPTIONS] = {};
    this[PLUGINS] = {};
    this[PROPS] = {};
    this[STYLES] = {};
    this[UTILS] = {};
  }

  getOptions = label => (label ? this[OPTIONS][label] : null);

  getFlattenPlugins = (pluginCollection, pluginLabel) =>
    Object.entries(pluginCollection).reduce((plugins, [label, pluginList]) => {
      if (pluginLabel && label !== pluginLabel) return plugins;
      return [...plugins, ...pluginList];
    }, []);

  getUtils = label => (label ? this[UTILS][label] : this[UTILS]);

  getChanges = label => (label ? this[CHANGES][label] : this[CHANGES]);

  getPlugins = label =>
    label
      ? this.getFlattenPlugins(this[PLUGINS], label)
      : this.getFlattenPlugins(this[PLUGINS]);

  getSyles = block =>
    Object.values(this[STYLES]).reduce((styles, style) => {
      if (style && style.getStyle) {
        return {
          ...styles,
          ...style.getStyle(block)
        };
      }
      return {
        ...styles
      };
    }, {});

  getData = el =>
    Object.values(this[STYLES]).reduce((styles, style) => {
      if (style && style.getData) {
        return {
          ...styles,
          ...style.getData(el)
        };
      }
      return {
        ...styles
      };
    }, {});

  getProps = nodeProps =>
    Object.values(this[PROPS]).reduce(
      (props, prop) => {
        if (prop && prop.getProps) {
          return {
            ...props,
            ...prop.getProps(props)
          };
        }
        return {
          ...props
        };
      },
      {
        ...nodeProps
      }
    );

  configureHelper = (key, value, label) => {
    switch (key) {
      case "style":
        if (this[STYLES][label]) {
          this[STYLES][label] = {
            ...this[STYLES][label],
            ...value
          };
        } else {
          this[STYLES][label] = value;
        }
        break;
      case "utils":
      case "helpers":
        if (this[UTILS][label]) {
          this[UTILS][label] = {
            ...this[UTILS][label],
            ...value
          };
        } else {
          this[UTILS][label] = value;
        }
        break;
      case "changes":
        if (this[CHANGES][label]) {
          this[CHANGES][label] = {
            ...this[CHANGES][label],
            ...value
          };
        } else {
          this[CHANGES][label] = value;
        }
        break;
      case "props":
        if (this[PROPS][label]) {
          this[PROPS][label] = {
            ...this[PROPS][label],
            ...value
          };
        } else {
          this[PROPS][label] = value;
        }
        break;
      default:
        break;
    }
  };

  configurePlugin = (createPlugin, options = {}, label) => {
    if (!label) return createPlugin(options, this);

    const plugin = createPlugin(options, this);
    let plugins;
    if (plugin.plugins) {
      // eslint-disable-next-line prefer-destructuring
      plugins = plugin.plugins;
    } else if (plugin.plugin) {
      plugins = [plugin.plugin];
    } else {
      plugins = [plugin];
    }
    plugins.forEach(pluginEntry =>
      Object.entries(pluginEntry).forEach(([key, value]) =>
        this.configureHelper(key, value, label)
      )
    );
    this[PLUGINS][label] = plugins;
    this[OPTIONS][label] = options;
    return plugins;
  };

  addPlugin = (createPlugin, options = {}, label) => {
    this.configurePlugin(createPlugin, options, label);
    return this.getPlugins();
  };

  removePlugin = label => {
    delete this[PLUGINS][label];
    return this.getPlugins();
  };

  makePlugins = (pluginDict = []) =>
    pluginDict.reduce(
      (plugins, { label, createPlugin, options }) => [
        ...plugins,
        ...this.configurePlugin(createPlugin, options, label)
      ],
      []
    );
}
