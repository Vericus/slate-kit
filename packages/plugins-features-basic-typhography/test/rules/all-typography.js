/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function serialize(editor, html) {
  return editor.deserializeHTML(html);
}

export const input = "<h1>word</h1><h1>another</h1>";

export const output = (
  <value>
    <document>
      <h1>word</h1>
      <h1>another</h1>
    </document>
  </value>
);
