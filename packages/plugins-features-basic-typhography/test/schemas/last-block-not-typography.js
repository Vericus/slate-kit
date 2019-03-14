/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export const input = (
  <value>
    <document>
      <paragraph>word</paragraph>
      <ol>word</ol>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph>word</paragraph>
      <ol>word</ol>
      <paragraph />
    </document>
  </value>
);
