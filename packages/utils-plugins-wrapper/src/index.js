import Symbol from "es6-symbol";

const UTILS = Symbol("utils");
const CHANGES = Symbol("changes");
const PLUGINS = Symbol("plugins");
const OPTIONS = Symbol("options");

export default class PluginsWrapper {
  constructor() {
    this.styles = {};
    this[UTILS] = {};
    this[CHANGES] = {};
    this[PLUGINS] = {};
    this[OPTIONS] = {};
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
    this.styles.values().reduce((styles, style) => {
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
    this.styles.values().reduce((styles, style) => {
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

  configureHelper = (key, value, label) => {
    switch (key) {
      case "style":
        if (this.style[label]) {
          this.styles[label] = {
            ...this.styles[label],
            ...value
          };
        } else {
          this.styles[label] = value;
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
