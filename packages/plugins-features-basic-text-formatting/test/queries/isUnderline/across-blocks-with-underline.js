/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  return editor.isUnderline();
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />
        <u>word</u>
      </paragraph>
      <h1>
        <u>word</u>
        <focus />
      </h1>
    </document>
  </value>
);

export const output = true;
