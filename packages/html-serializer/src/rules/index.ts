// combine rulesGenerators constructor to build slate-html-serializer's rule
// using getData and getProps coming from @vericus/slate-kit-plugins-wrapper
export default function makeRules({ rulesGenerators, getData, getProps }) {
  return rulesGenerators.reduce(
    (acc, ruleGenerator) => [...acc, ...ruleGenerator(getData, getProps)],
    []
  );
}
