/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  editor.toggleStrikethrough();
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
      <h1>
        wo
        <anchor />
        <s>
          <i>rd</i>
        </s>
      </h1>
      <h1>
        <s>
          <i>an</i>
        </s>
        <focus />
        other
      </h1>
    </document>
  </value>
);
