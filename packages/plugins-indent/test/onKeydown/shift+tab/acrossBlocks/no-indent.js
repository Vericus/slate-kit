/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor, createEvent) {
  const keyEvent = createEvent("keydown", {
    key: "tab",
    shiftKey: true
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
        another
        <focus />
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph>
        <anchor />
        word
      </paragraph>
      <paragraph>
        another
        <focus />
      </paragraph>
    </document>
  </value>
);
