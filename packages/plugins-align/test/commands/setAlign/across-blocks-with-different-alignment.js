/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor) {
  editor.setAlign("left");
}

export const input = (
  <value>
    <document>
      <h1 textAlign="center">
        wo
        <anchor />
        <i>rd</i>
      </h1>
      <h1 textAlign="right">
        <i>an</i>
        <focus />
        other
      </h1>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <h1 textAlign="left">
        wo
        <anchor />
        <i>rd</i>
      </h1>
      <h1 textAlign="left">
        <i>an</i>
        <focus />
        other
      </h1>
    </document>
  </value>
);
