/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  editor.setAlign("right");
}

export const input = (
  <value>
    <document>
      <h1>
        wo
        <anchor />
        <i>rd</i>
      </h1>
      <h1>
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
      <h1 textAlign="right">
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
