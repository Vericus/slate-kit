import React, { Component } from "react";
import { CirclePicker } from "react-color";
import PropTypes from "prop-types";
import Popover from "react-popover";
import classnames from "classnames";
import QuillIcons from "quill-icons";

export class IconButton extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.active !== nextProps.active ||
      this.props.disabled !== nextProps.disabled ||
      this.props.style !== nextProps.style
    );
  }
  render() {
    const Icon = QuillIcons[this.props.icon];
    const buttonCls = classnames({
      [this.props.className || ""]: true,
      "btn-icon": true,
      "btn-icon--active": this.props.active,
      "btn-icon--disabled": this.props.disabled
    });
    return (
      <div style={{ display: "inline-block" }}>
        <button
          className={buttonCls}
          onMouseDown={this.props.onMouseDown}
          disabled={this.props.disabled}
          style={this.props.style}
        >
          <Icon width={this.props.size} height={this.props.size} />
        </button>
      </div>
    );
  }
}

const ContextPopover = props => {
  return (
    <Popover
      body={props.body}
      isOpen={props.isOpen}
      preferPlace={props.preferPlace}
      place={props.place}
      tipSize={0.01}
      onOuterAction={props.onOuterAction}
      target={props.target}
      style={props.style}
    >
      {props.children}
    </Popover>
  );
};

const textColors = [
  "#e81a17",
  "#ff6600",
  "#ffce00",
  "#774835",
  "#d900b5",
  "#00a854",
  "#00a3a3",
  "#007138",
  "#0066ff",
  "#aa00ff",
  "#5100f5",
  "#004183",
  "#f5f5f5",
  "#bdccd4",
  "#7f8c8d",
  "#303030",
  "#000000",
  "#ffffff"
];
const highlightColors = [
  "#ff003c",
  "#ffc200",
  "#ffee00",
  "#ffa969",
  "#ff9df9",
  "#b2e35a",
  "#2ee689",
  "#29cccc",
  "#57d3ff",
  "#b68cff",
  "#6565ff",
  "#4ca2ff",
  "#fafafa",
  "#dfeaf0",
  "#b0c5c7",
  "transparent"
];

class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      color: this.props.color
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      color: nextProps.color
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.color !== nextState.color ||
      this.state.isOpen !== nextState.isOpen ||
      this.props.isReadOnly !== nextProps.isReadOnly
    );
  }

  onOpen = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      isOpen: true,
      color: this.props.color
    });
  };

  onExit = event => {
    this.setState({
      isOpen: false
    });
  };

  onChange = (color, event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ color });

    this.props.onChange(color, event);
  };

  renderColorPicker = () => (
    <div
      style={{
        minWidth: "270px",
        background: "white",
        padding: "0",
        margin: "0",
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "3px",
        boxSizing: "border-box",
        overflow: "hidden",
        boxShadow: "0 0 4px 0 rgba(0,0,0,0.09), 0 4px 9px 0 rgba(0,0,0,0.24)"
      }}
    >
      <div
        style={{
          padding: "0px 27px",
          lineHeight: "45px",
          minHeight: "18px",
          margin: "9px 0px",
          flexGrow: "2"
        }}
      >
        <CirclePicker
          color={this.state.color}
          onChange={this.onChange}
          triangle="hide"
          colors={this.props.colors}
        />
      </div>
    </div>
  );

  render() {
    return (
      <ContextPopover
        isOpen={this.state.isOpen}
        onOuterAction={this.onExit}
        body={this.renderColorPicker()}
      >
        <IconButton
          icon={this.props.icon}
          onMouseDown={this.onOpen}
          className="colored-icon"
          style={{
            color:
              this.props.color === "transparent" ? "black" : this.props.color,
            fill:
              this.props.color === "transparent" ? "black" : this.props.color,
            stroke:
              this.props.color === "transparent" ? "black" : this.props.color
          }}
          size="18"
          disabled={this.props.isReadOnly}
        />
      </ContextPopover>
    );
  }
}

export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    const { pluginsWrapper, editor } = props;
    this.currentTypography = editor.currentTypography
      ? editor.currentTypography
      : () => true;
    this.typographies = {
      "heading-one": {
        icon: "Header",
        change: editor.toggleTypography ? editor.toggleTypography : () => {},
        disabled: !editor.toggleTypography
      },
      "heading-two": {
        icon: "Header2",
        change: editor.toggleTypography ? editor.toggleTypography : () => {},
        disabled: !editor.toggleTypography
      },
      "heading-three": {
        icon: "Header3",
        change: editor.toggleTypography ? editor.toggleTypography : () => {},
        disabled: !editor.toggleTypography
      },
      "heading-four": {
        icon: "Header4",
        change: editor.toggleTypography ? editor.toggleTypography : () => {},
        disabled: !editor.toggleTypography
      },
      paragraph: {
        icon: "Header5",
        change: editor.toggleTypography ? editor.toggleTypography : () => {},
        disabled: !editor.toggleTypography
      },
      blockquote: {
        icon: "Blockquote",
        change: editor.toggleTypography ? editor.toggleTypography : () => {},
        disabled: !editor.toggleTypography
      }
    };
    this.lists = {
      "ol-list": {
        icon: "ListOrdered",
        change: editor.changeListType ? editor.changeListType : () => {},
        disabled: !editor.changeListType,
        isActive: editor.isOrderedList ? editor.isOrderedList : () => false
      },
      "ul-list": {
        icon: "ListBullet",
        change: editor.changeListType ? editor.changeListType : () => {},
        disabled: !editor.changeListType,
        isActive: editor.isUnorderedList ? editor.isUnorderedList : () => false
      },
      "check-list": {
        icon: "ListCheck",
        change: editor.changeListType ? editor.changeListType : () => {},
        disabled: !editor.changeListType,
        isActive: editor.isCheckList ? editor.isCheckList : () => false
      }
    };
    this.marks = {
      bold: {
        icon: "Bold",
        change: editor.toggleBold ? editor.toggleBold : () => {},
        disabled: !editor.toggleBold,
        isActive: editor.isBold ? editor.isBold : () => false
      },
      italic: {
        icon: "Italic",
        change: editor.toggleItalic ? editor.toggleItalic : () => {},
        disabled: !editor.toggleItalic,
        isActive: editor.isItalic ? editor.isItalic : () => false
      },
      underline: {
        icon: "Underline",
        change: editor.toggleUnderline ? editor.toggleUnderline : () => {},
        disabled: !editor.toggleUnderline,
        isActive: editor.isUnderline ? editor.isUnderline : () => false
      },
      strikethrough: {
        icon: "Strike",
        change: editor.toggleStrikethrough
          ? editor.toggleStrikethrough
          : () => {},
        disabled: !editor.toggleStrikethrough,
        isActive: editor.isStrikethrough ? editor.isStrikethrough : () => false
      }
    };
    this.allignments = {
      left: {
        icon: "AlignLeft",
        change: editor.setAlign ? editor.setAlign : () => {},
        disabled: !editor.setAlign,
        isActive: editor.isAligned ? editor.isAligned : () => false
      },
      center: {
        icon: "AlignCenter",
        change: editor.setAlign ? editor.setAlign : () => {},
        disabled: !editor.setAlign,
        isActive: editor.isAligned ? editor.isAligned : () => false
      },
      right: {
        icon: "AlignRight",
        change: editor.setAlign ? editor.setAlign : () => {},
        disabled: !editor.setAlign,
        isActive: editor.isAligned ? editor.isAligned : () => false
      }
    };
  }

  handleClickMark = (event, change) => {
    event.preventDefault();
    event.stopPropagation();
    change();
  };

  handleClickTypography = (event, change, type) => {
    event.preventDefault();
    event.stopPropagation();
    change(type);
  };

  renderTyphography = () => {
    return Object.entries(this.typographies).map(([type, options]) => {
      return (
        <IconButton
          key={options.icon}
          icon={options.icon}
          onMouseDown={e => this.handleClickTypography(e, options.change, type)}
          disabled={options.disabled || this.props.isReadOnly}
          active={this.currentTypography() === type}
          size="18"
        />
      );
    });
  };

  handleClickList = (event, change, type) => {
    event.preventDefault();
    event.stopPropagation();
    change(type);
  };

  renderList = () => {
    return Object.entries(this.lists).map(([type, options]) => {
      return (
        <IconButton
          key={options.icon}
          icon={options.icon}
          onMouseDown={e => this.handleClickList(e, options.change, type)}
          disabled={options.disabled || this.props.isReadOnly}
          active={options.isActive()}
          size="18"
        />
      );
    });
  };

  handleClickIndent = event => {
    const { editor } = this.props;
    event.preventDefault();
    event.stopPropagation();
    editor.increaseIndent();
  };

  handleClickOutdent = event => {
    const { editor } = this.props;
    event.preventDefault();
    event.stopPropagation();
    editor.decreaseIndent();
  };

  canBeIndented = () => {
    const { editor } = this.props;
    return editor.canBeIndented ? editor.canBeIndented() : false;
  };

  canBeOutdented = () => {
    const { editor } = this.props;
    return editor.canBeIndented ? editor.canBeOutdented() : false;
  };

  renderIndent = () => {
    return [
      <IconButton
        key="Indent"
        icon="Indent"
        onMouseDown={e => this.handleClickIndent(e)}
        disabled={this.props.isReadOnly || !this.props.editor.increaseIndent}
        size="18"
      />,
      <IconButton
        key="Outdent"
        icon="Outdent"
        onMouseDown={e => this.handleClickOutdent(e)}
        disabled={this.props.isReadOnly || !this.props.editor.decreaseIndent}
        size="18"
      />
    ];
  };

  handleClickAlignment = (event, change, type) => {
    event.preventDefault();
    event.stopPropagation();
    change(type);
  };

  renderAllignment = () => {
    const { editor } = this.props;
    return Object.entries(this.allignments).map(([type, options]) => {
      return (
        <IconButton
          key={options.icon}
          icon={options.icon}
          onMouseDown={e => this.handleClickAlignment(e, options.change, type)}
          disabled={
            options.disabled || this.props.isReadOnly || !editor.isAlignable()
          }
          active={options.isActive(type)}
          size="18"
        />
      );
    });
  };

  renderMarks = () => {
    return Object.entries(this.marks).map(([type, options]) => {
      return (
        <IconButton
          key={options.icon}
          icon={options.icon}
          onMouseDown={e => this.handleClickMark(e, options.change)}
          disabled={options.disabled || this.props.isReadOnly}
          active={options.isActive()}
          size="18"
        />
      );
    });
  };

  handleHistory = (event, type) => {
    const { editor } = this.props;
    event.preventDefault();
    event.stopPropagation();
    const handler = type === "undo" ? editor.handleUndo : editor.handleRedo;
    handler();
  };

  hasHistory = type => {
    const { editor } = this.props;
    const check = type === "undo" ? editor.hasUndo : editor.hasRedo;
    if (check) return check();
    return false;
  };

  renderHistories = () => {
    return this.hasHistory
      ? [
          <IconButton
            key="Undo"
            icon="Undo"
            onMouseDown={e => this.handleHistory(e, "undo")}
            disabled={!this.hasHistory("undo") || this.props.isReadOnly}
            size="18"
          />,
          <IconButton
            key="Redo"
            icon="Redo"
            onMouseDown={e => this.handleHistory(e, "redo")}
            disabled={!this.hasHistory("redo") || this.props.isReadOnly}
            size="18"
          />
        ]
      : null;
  };

  onImageInsert = e => {
    const { editor } = this.props;
    editor.insertImage();
  };

  renderMedia = () => {
    const { editor } = this.props;
    return (
      <IconButton
        key="Image"
        icon="Image"
        onMouseDown={e => {
          e.preventDefault();
          this.onImageInsert();
        }}
        disabled={!editor.insertImage || this.props.isReadOnly}
        size="18"
      />
    );
  };

  handleColorChange = (change, color) => {
    change(color.hex);
  };

  renderColorButton = (label, colors, icon) => {
    const { editor } = this.props;
    return editor[`current${label}Color`] ? (
      <ColorPicker
        key={icon}
        icon={icon}
        colors={colors}
        color={editor[`current${label}Color`]()}
        onChange={color =>
          this.handleColorChange(editor[`change${label}Color`], color)
        }
        isReadOnly={this.props.isReadOnly}
      />
    ) : null;
  };

  renderTextColor = () => {
    return this.renderColorButton("Text", textColors, "Color");
  };

  renderBackgroundColor = () => {
    return this.renderColorButton("Background", highlightColors, "Background");
  };
  renderStateLogger = () => {
    const { editor } = this.props;
    return [
      <button onMouseDown={e => console.log(editor.value)} key="state-logger">
        Log State
      </button>,
      <button
        onMouseDown={e => console.log(JSON.stringify(editor.value.toJSON()))}
        key="json-state-logger"
      >
        Log JSON State
      </button>
    ];
  };

  render() {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: "99999",
          background: "white"
        }}
      >
        {this.renderTyphography()}
        {this.renderIndent()}
        {this.renderAllignment()}
        {this.renderList()}
        {this.renderMarks()}
        {this.renderMedia()}
        {this.renderTextColor()}
        {this.renderBackgroundColor()}
        {this.renderHistories()}
        {this.renderStateLogger()}
      </div>
    );
  }
}
