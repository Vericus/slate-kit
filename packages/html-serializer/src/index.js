import HTML from "slate-html-serializer";
import makeRules from "./rules";

function HTMLSerializer({ rulesGenerators, getData, getProps }) {
  return new HTML({ rules: makeRules({ rulesGenerators, getData, getProps }) });
}

export default HTMLSerializer;
