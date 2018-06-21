/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(change, highlightText) {
  return highlightText(change, "red");
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />
        <highlight backgroundColor="red">word</highlight>
        <focus />
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph>
        <anchor />
        <highlight backgroundColor="red">word</highlight>
        <focus />
      </paragraph>
    </document>
  </value>
);
