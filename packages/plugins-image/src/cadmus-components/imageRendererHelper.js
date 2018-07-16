import React from "react";

const buttonStyle = {
  color: "#767676",
  paddingTop: "10rem",
  textAlign: "center"
};

const aStyle = {
  textDecoration: "underline",
  cursor: "pointer"
};

const toolBarStyles = selected => {
  return {
    background: "rgba(0,0,0,0.5)", // todo: "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0));",
    display: "flex",
    justifyContent: "center",
    opacity: selected ? 1 : 0,
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
  const iconMap = {
    delete: "␡",
    "re-upload": "⬆"
  };
  return (
    <div onMouseDown={props.action} style={iconStyles({ size })}>
      <div
        style={{
          textAlign: "center",
          lineHeight: size
        }}
      >
        {iconMap[props.name]}
      </div>
    </div>
  );
};

export const DefaultRenderToolbar = ({ selected, loading }, tools) => {
  return (
    <div style={toolBarStyles(selected)}>
      {selected &&
        tools.map(
          tool =>
            (tool.always || !loading) && (
              <DefaultToolbarIcon
                name={tool.name}
                action={tool.action}
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
