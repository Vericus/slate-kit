/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor) {
  editor.toggleTypography("heading-one");
}

export const input = (
  <value>
    <document>
      <paragraph>
        <hyperlink>
          <anchor />
          word
        </hyperlink>
      </paragraph>
      <paragraph>
        <hyperlink>
          <focus />
          another
        </hyperlink>
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <h1>
        <hyperlink>
          <anchor />
          word
        </hyperlink>
      </h1>
      <h1>
        <hyperlink>
          <focus />
          another
        </hyperlink>
      </h1>
    </document>
  </value>
);
