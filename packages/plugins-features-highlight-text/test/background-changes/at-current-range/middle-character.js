/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(change, highlightText) {
  return highlightText(change, "red");
}

export const input = (
  <value>
    <document>
      <paragraph>
        w<anchor />o<focus />rd
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph>
        w<anchor />
        <highlight backgroundColor="red">o</highlight>
        <focus />rd
      </paragraph>
    </document>
  </value>
);
