/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function serialize(editor, html) {
  return editor.deserializeHTML(html);
}

export const input = "<div>word</div>";

export const output = (
  <value>
    <document>
      <paragraph>word</paragraph>
    </document>
  </value>
);
