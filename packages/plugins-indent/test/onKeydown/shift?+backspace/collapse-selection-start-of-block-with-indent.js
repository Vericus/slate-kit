/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor, createEvent) {
  const keyEvent = createEvent("keydown", {
    key: "backspace",
    shiftKey: true,
  });
  editor.run("onKeyDown", keyEvent);
}

export const input = (
  <value>
    <document>
      <paragraph indentation={7}>
        <cursor />
        word
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph indentation={6}>
        <cursor />
        word
      </paragraph>
    </document>
  </value>
);
