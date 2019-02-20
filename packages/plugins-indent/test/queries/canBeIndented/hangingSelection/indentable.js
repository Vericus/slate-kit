/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  return editor.canBeIndented();
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />
        <b>word</b>
      </paragraph>
      <paragraph>
        <focus />
        <b>word</b>
      </paragraph>
    </document>
  </value>
);

export const output = true;
