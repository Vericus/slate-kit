/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  editor.toggleTypography("heading-one");
}

export const input = (
  <value>
    <document>
      <paragraph>
        wo
        <anchor />
        rd
      </paragraph>
      <paragraph>
        an
        <focus />
        other
      </paragraph>
    </document>
  </value>
);

export const output = (
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
