/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function serialize(editor, html) {
  return editor.deserializeHTML(html);
}

export const input = "<p><b>word</b></p>";

export const output = (
  <value>
    <document>
      <paragraph>
        <b>word</b>
      </paragraph>
    </document>
  </value>
);
