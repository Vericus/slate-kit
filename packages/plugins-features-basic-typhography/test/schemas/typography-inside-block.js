/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export const input = (
  <value>
    <document>
      <ol>
        <paragraph>word</paragraph>
      </ol>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph>word</paragraph>
      <paragraph />
    </document>
  </value>
);
