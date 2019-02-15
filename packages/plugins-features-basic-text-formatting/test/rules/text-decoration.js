/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function serialize(editor, html) {
  return editor.deserializeHTML(html);
}

export const input =
  '<p><span style="text-decoration: underline;">word</span></p>';

export const output = (
  <value>
    <document>
      <paragraph>
        <u>word</u>
      </paragraph>
    </document>
  </value>
);
