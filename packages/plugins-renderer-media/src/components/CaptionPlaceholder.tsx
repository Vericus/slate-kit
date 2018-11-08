import * as React from "react";
import { Props } from "../types";

const CaptionPlaceholder: React.SFC<Props> = props => {
  const { isSelected, children } = props;
  const placeholderStyle: React.CSSProperties = {
    pointerEvents: "none",
    display: "inline-block",
    maxWidth: "100%",
    whiteSpace: "nowrap",
    opacity: 0.333
  };
  const innerStyle: React.CSSProperties = {
    whiteSpace: "pre-wrap",
    width: "100%",
    left: 0,
    textIndent: "initial",
    maxHeight: 180,
    overflow: "hidden"
  };
  return (
    <React.Fragment>
      <span
        contentEditable={false}
        style={placeholderStyle}
        className="placeholder"
      >
        {isSelected ? null : (
          <span className="innerPlaceholder" style={innerStyle}>
            Add Caption Here
          </span>
        )}
      </span>
      {children}
    </React.Fragment>
  );
};

export default CaptionPlaceholder;
