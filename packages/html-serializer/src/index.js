import HTML from "slate-html-serializer";
import makeRules from "./rules";

// build slate-html-serializer rules with ruleGenerator from slate-kit style plugins
function HTMLSerializer({ rulesGenerators, getData, getProps }) {
  return new HTML({ rules: makeRules({ rulesGenerators, getData, getProps }) });
}

export default HTMLSerializer;
