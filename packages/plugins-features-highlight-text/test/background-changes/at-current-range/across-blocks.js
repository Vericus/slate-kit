/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor, name) {
  editor[`change${name}Color`]("#FF00FF");
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
      <paragraph>
        wo
        <anchor />
        <highlight backgroundColor="#FF00FF">rd</highlight>
      </paragraph>
      <paragraph>
        <highlight backgroundColor="#FF00FF">an</highlight>
        <focus />
        other
      </paragraph>
    </document>
  </value>
);
