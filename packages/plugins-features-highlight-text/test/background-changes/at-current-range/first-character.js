/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(change, highlighText) {
  return highlighText(change, "red");
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />w<focus />ord
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph>
        <anchor />
        <highlight backgroundColor="red">w</highlight>
        <focus />ord
      </paragraph>
    </document>
  </value>
);
