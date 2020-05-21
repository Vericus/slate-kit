/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor, name) {
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
        <color color="#FF00FF">rd</color>
      </paragraph>
      <paragraph>
        <color color="#FF00FF">an</color>
        <focus />
        other
      </paragraph>
    </document>
  </value>
);
