import * as React from "react";
import { Editor } from "slate";
import Options, { TypeOptions } from "./options";

export default function createRenderMark(options: TypeOptions) {
  const { render, placeholder, type } = options;
  return (props, editor: Editor, next) => {
    const { children, mark } = props;
    if (mark.type === `${type}-placeholder`) {
      if (render) {
        return render(props);
      }
      const style: React.CSSProperties = {
        pointerEvents: "none",
        display: "inline-block",
        width: "0",
        maxWidth: "100%",
        whiteSpace: "nowrap",
        opacity: 0.333
      };

      return (
        <React.Fragment>
          <span contentEditable={false} style={style}>
            {placeholder}
          </span>
          {children}
        </React.Fragment>
      );
    }
    return next();
  };
}
