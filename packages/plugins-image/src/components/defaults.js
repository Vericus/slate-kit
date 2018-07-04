import React from "react";

export const defaultComponentStyle = {
  backgroundColor: "#f8f8f8",
  height: "25rem"
};

const buttonStyle = {
  color: "#767676",
  paddingTop: "10rem",
  textAlign: "center"
};

const aStyle = {
  textDecoration: "underline",
  cursor: "pointer"
};

const toolBarStyles = hovering => {
  return {
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    opacity: hovering ? 1 : 0,
    transition: "opacity 0.3s"
  };
};

const iconStyles = ({ size }) => {
  return {
    display: "inline-block",
    height: size,
    width: size,
    background: "white",
    border: "1px solid #767676",
    borderRadius: size,
    margin: "0.5rem",
    cursor: "pointer",
    background: "black",
    boxShadow: "0px 0px 5px 0px white",
    color: "white"
  };
};

const DefaultToolbarIcon = props => {
  const size = "2rem";
  return (
    <div onMouseDown={props.action} style={iconStyles({ size })}>
      <div
        style={{
          textAlign: "center",
          lineHeight: size
        }}
      >
        {props.icon}
      </div>
    </div>
  );
};

export const DefaultRenderToolbar = ({ hovering, loading }, tools) => {
  return (
    <div style={toolBarStyles(hovering)}>
      {hovering &&
        tools.map(
          tool =>
            (tool.always || !loading) && (
              <DefaultToolbarIcon
                name={tool.name}
                action={tool.action}
                icon={tool.icon}
                key={tool.name}
              />
            )
        )}
    </div>
  );
};

export const DefaultRenderSelect = (chooseFile, handleDeleteImage) => {
  return (
    <div style={buttonStyle}>
      <div>
        <a style={aStyle} onClick={chooseFile}>
          attach an image from your computer
        </a>
      </div>
      <div>
        <a onMouseDown={handleDeleteImage} style={aStyle}>
          cancel
        </a>
      </div>
    </div>
  );
};

export const DefaultRenderError = (error = "There was an error") => {
  return (
    <div style={{ color: "red", textAlign: "center" }}>
      <p style={{ textDecoration: "none" }}>{error}. Please try again.</p>
    </div>
  );
};
