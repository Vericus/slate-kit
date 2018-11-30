/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  editor.insertDefault();
}

export const input = (
  <value>
    <document>
      <h1>
        wo
        <anchor />
        rd
      </h1>
      <h1>
        an
        <focus />
        other
      </h1>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <h1>wo</h1>
      <paragraph>
        <cursor />
      </paragraph>
      <h1>other</h1>
    </document>
  </value>
);
