/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(change, highlightText) {
  return highlightText(change, "red");
}

export const input = (
  <value>
    <document>
      <paragraph>
        wor<anchor />d<focus />
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph>
        wor<anchor />
        <highlight backgroundColor="red">d</highlight>
        <focus />
      </paragraph>
    </document>
  </value>
);
