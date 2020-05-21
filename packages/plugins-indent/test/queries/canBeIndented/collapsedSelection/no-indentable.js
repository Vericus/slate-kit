/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor) {
  return editor.canBeIndented();
}

export const input = (
  <value>
    <document>
      <quote>
        <cursor />
        <b>word</b>
      </quote>
    </document>
  </value>
);

export const output = false;
