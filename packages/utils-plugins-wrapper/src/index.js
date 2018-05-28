import Symbol from "es6-symbol";
import mergeWith from "lodash/mergeWith";
import HTMLSerializer from "@vericus/slate-kit-html-serializer";

const CHANGES = Symbol("changes");
const OPTIONS = Symbol("options");
const PLUGINS = Symbol("plugins");
const PROPS = Symbol("props");
const STYLES = Symbol("styles");
const UTILS = Symbol("utils");
const SCHEMAS = Symbol("schema");
const RULES = Symbol("rules");

/**
 * Resolve a document rule `obj`.
 *
 * @param {Object} obj
 * @return {Object}
 */

function resolveDocumentRule(obj) {
  return {
    data: {},
    nodes: null,
    ...obj
  };
}

/**
 * Resolve a node rule with `type` from `obj`.
 *
 * @param {String} object
 * @param {String} type
 * @param {Object} obj
 * @return {Object}
 */

function resolveNodeRule(object, type, obj) {
  return {
    data: {},
    isVoid: null,
    nodes: null,
    first: null,
    last: null,
    parent: null,
    text: null,
    ...obj
  };
}

/**
 * A Lodash customizer for merging schema definitions. Special cases `objects`,
 * `marks` and `types` arrays to be unioned, and ignores new `null` values.
 *
 * @param {Mixed} target
 * @param {Mixed} source
 * @return {Array|Void}
 */

function customizer(target, source, key) {
  if (key === "objects" || key === "types" || key === "marks") {
    return target == null ? source : target.concat(source);
  }
  return source == null ? target : source;
}

function defaultSchemaCustomizer(schema, schemas) {
  const customizedSchema = schema;
  schemas.forEach(s => {
    if (!s) return;
    const { document = {}, blocks = {}, inlines = {} } = s;
    const d = resolveDocumentRule(document);
    const bs = {};
    const is = {};
    /* eslint-disable guard-for-in, no-restricted-syntax */
    for (const key in blocks) {
      bs[key] = resolveNodeRule("block", key, blocks[key]);
    }

    for (const key in inlines) {
      is[key] = resolveNodeRule("inline", key, inlines[key]);
    }
    /* eslint-enable guard-for-in, no-restricted-syntax */
    mergeWith(customizedSchema.document, d, customizer);
    mergeWith(customizedSchema.blocks, bs, customizer);
    mergeWith(customizedSchema.inlines, is, customizer);
  });
  return customizedSchema;
}

export default class PluginsWrapper {
  constructor(
    { schemaCustomizer } = { schemaCustomizer: defaultSchemaCustomizer }
  ) {
    this[CHANGES] = {};
    this[OPTIONS] = {};
    this[PLUGINS] = {};
    this[PROPS] = {};
    this[STYLES] = {};
    this[UTILS] = {};
    this[SCHEMAS] = {};
    this[RULES] = {};
    this.serializers = null;
    this.schema = {
      blocks: {},
      inlines: {},
      document: {}
    };
    this.schemaCustomizer = schemaCustomizer;
  }

  getOptions = label => (label ? this[OPTIONS][label] : null);

  getFlattenPlugins = (pluginCollection, pluginLabel) => [
    ...Object.entries(pluginCollection).reduce(
      (plugins, [label, pluginList]) => {
        if (pluginLabel && label !== pluginLabel) return plugins;
        return [...plugins, ...pluginList];
      },
      []
    ),
    { schema: this.getSchema() }
  ];

  getSchemas = label => {
    if (label) return this[SCHEMAS][label];
    return Object.entries(this[SCHEMAS]).reduce(
      (schemas, entry) => schemas.concat(entry[1]),
      []
    );
  };

  getSchema = () => this.schemaCustomizer(this.schema, this.getSchemas());

  getUtils = label => (label ? this[UTILS][label] : this[UTILS]);

  getChanges = label => (label ? this[CHANGES][label] : this[CHANGES]);

  getPlugins = label =>
    label
      ? this.getFlattenPlugins(this[PLUGINS], label)
      : this.getFlattenPlugins(this[PLUGINS]);

  getData = el =>
    Object.values(this[STYLES]).reduce((styles, style) => {
      if (style && style.getData) {
        const passData = style.getData(el);
        const marks = styles.marks || [];
        if (passData.mark) {
          return {
            ...styles,
            marks: [...marks, passData.mark]
          };
        }
        return {
          ...styles,
          ...passData
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
      case "getSchema":
        if (this[SCHEMAS][label]) {
          this[SCHEMAS][label] = value();
        } else {
          this[SCHEMAS][label] = value();
        }
        break;
      case "options":
        this[OPTIONS][label] = value;
        break;
      case "rules":
        this[RULES][label] = value;
        break;
      default:
        break;
    }
  };

  getSerializer = () => this.serializer;

  updateSerializer = () => {
    const rulesGenerators = Object.entries(this[RULES]).reduce(
      (acc, [label, rulesGenerator]) => [
        ...acc,
        (...args) => rulesGenerator(this[OPTIONS][label], ...args)
      ],
      []
    );
    this.serializer = HTMLSerializer({
      rulesGenerators,
      getData: this.getData,
      getProps: this.getProps
    });
    return this.serializer;
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
    return plugins;
  };

  addPlugin = (createPlugin, options = {}, label) => {
    this.configurePlugin(createPlugin, options, label);
    this.serializer = this.updateSerializer();
    return this.getPlugins();
  };

  removePlugin = label => {
    delete this[PLUGINS][label];
    return this.getPlugins();
  };

  makePlugins = (pluginDict = []) => {
    const plugins = [
      ...pluginDict.reduce(
        (acc, { label, createPlugin, options }) => [
          ...acc,
          ...this.configurePlugin(createPlugin, options, label)
        ],
        []
      ),
      { schema: this.getSchema() }
    ];
    this.serializer = this.updateSerializer();
    return plugins;
  };
}
