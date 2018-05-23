export default function MakeRules({ rulesGenerators, getData, getProps }) {
  return rulesGenerators.reduce(
    (acc, ruleGenerator) => [...acc, ...ruleGenerator(getData, getProps)],
    []
  );
}
