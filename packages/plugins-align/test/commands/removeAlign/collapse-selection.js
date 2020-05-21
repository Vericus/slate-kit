/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor) {
  editor.removeAlign("center");
}

export const input = (
  <value>
    <document>
      <h1 textAlign="center">
        wo
        <cursor />
        <i>rd</i>
      </h1>
      <ol>
        <i>an</i>
        other
      </ol>
      <paragraph />
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <h1>
        wo
        <cursor />
        <i>rd</i>
      </h1>
      <ol>
        <i>an</i>
        other
      </ol>
      <paragraph />
    </document>
  </value>
);
