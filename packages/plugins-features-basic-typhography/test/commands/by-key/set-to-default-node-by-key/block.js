/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor) {
  editor.setToDefaultNodeByKey("a");
}

export const input = (
  <value>
    <document>
      <h1 key="a">word</h1>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph>word</paragraph>
    </document>
  </value>
);
