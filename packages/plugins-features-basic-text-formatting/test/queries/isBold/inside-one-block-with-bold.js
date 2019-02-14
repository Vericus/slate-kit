/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  return editor.isBold();
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />
        <b>word</b>
        <focus />
      </paragraph>
    </document>
  </value>
);

export const output = true;
