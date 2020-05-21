import * as React from "react";
import { Props } from "../types";

const CaptionPlaceholder: React.SFC<Props> = (props) => {
  const { children } = props;
  const placeholderStyle: React.CSSProperties = {
    pointerEvents: "none",
    display: "inline-flex",
    width: "100%",
    whiteSpace: "nowrap",
    flexDirection: "column-reverse",
    opacity: 0.333,
  };
  const innerStyle: React.CSSProperties = {
    position: "absolute",
    whiteSpace: "pre-wrap",
    width: "100%",
    left: 0,
    textIndent: "initial",
    maxHeight: 180,
    overflow: "hidden",
  };
  return (
    <span style={placeholderStyle} className="placeholder">
      <span
        contentEditable={false}
        className="innerPlaceholder"
        style={innerStyle}
      >
        Add Caption Here
      </span>
      {children}
    </span>
  );
};

export default CaptionPlaceholder;
