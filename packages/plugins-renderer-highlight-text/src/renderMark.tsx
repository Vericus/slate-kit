import * as React from "react";
import { Mark, Editor } from "slate";

export interface Props {
  mark: Mark;
  children: JSX.Element;
  attributes: any;
  className?: string;
}

export default function createRenderMark(type) {
  return {
    onConstruct: (editor: Editor, next) => {
      if ((editor.registerMarkRenderer, editor.getMarkType)) {
        editor.registerMarkRenderer(
          editor.getMarkType(type),
          (props: Props) => {
            const { attributes, children, className } = props;
            return (
              <span {...attributes} className={className}>
                {children}
              </span>
            );
          }
        );
      }
      return next();
    }
  };
}
