import Symbol from "es6-symbol";

const UTILS = Symbol("utils");
const CHANGES = Symbol("changes");

export default class PluginsWrapper {
  constructor() {
    this.styles = {};
    this[UTILS] = {};
    this[CHANGES] = {};
  }

  getUtils = label => (label ? this[UTILS][label] : undefined);
  getChanges = label => (label ? this[CHANGES][label] : undefined);
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
        this.styles[label] = value;
        break;
      case "utils":
        this[UTILS][label] = value;
        break;
      case "changes":
        this[CHANGES][label] = value;
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
    return plugins;
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
