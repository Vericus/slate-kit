/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(change, colorText) {
  return colorText(change, "red");
}

export const input = (
  <value>
    <document>
      <paragraph>
        w<anchor />o<focus />rd
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph>
        w<anchor />
        <color color="red">o</color>
        <focus />rd
      </paragraph>
    </document>
  </value>
);
