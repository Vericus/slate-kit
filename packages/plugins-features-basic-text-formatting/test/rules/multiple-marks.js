/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function serialize(editor, html) {
  return editor.deserializeHTML(html);
}

export const input = "<p><i><b>word</b></i></p>";

export const output = (
  <value>
    <document>
      <paragraph>
        <i>
          <b>word</b>
        </i>
      </paragraph>
    </document>
  </value>
);
