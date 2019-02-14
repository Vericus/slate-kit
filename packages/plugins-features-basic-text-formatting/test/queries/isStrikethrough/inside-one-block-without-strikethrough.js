/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  return editor.isStrikethrough();
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />
        <i>word</i>
        <focus />
      </paragraph>
    </document>
  </value>
);

export const output = false;
