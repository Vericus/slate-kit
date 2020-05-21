/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor, createEvent) {
  const keyEvent = createEvent("keydown", {
    key: "tab",
    shiftKey: true,
  });
  editor.run("onKeyDown", keyEvent);
}

export const input = (
  <value>
    <document>
      <paragraph indentation={7}>
        <anchor />
        word
      </paragraph>
      <paragraph indentation={7}>
        another
        <focus />
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph indentation={6}>
        <anchor />
        word
      </paragraph>
      <paragraph indentation={6}>
        another
        <focus />
      </paragraph>
    </document>
  </value>
);
