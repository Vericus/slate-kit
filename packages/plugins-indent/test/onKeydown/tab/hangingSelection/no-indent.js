/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor, createEvent) {
  const keyEvent = createEvent("keydown", {
    key: "tab"
  });
  editor.run("onKeyDown", keyEvent);
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />
        word
      </paragraph>
      <paragraph>
        <focus />
        another
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph indentation={1}>
        <anchor />
        word
      </paragraph>
      <paragraph>
        <focus />
        another
      </paragraph>
    </document>
  </value>
);
