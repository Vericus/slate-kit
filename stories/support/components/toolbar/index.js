import React, { Component } from "react";
import { CirclePicker } from "react-color";
import PropTypes from "prop-types";
import Popover from "react-popover";
import classnames from "classnames";
import QuillIcons from "quill-icons";

class IconButton extends Component {
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
    const { pluginsWrapper } = props;
    const hasTypography = pluginsWrapper.getChanges("basic-typhography");
    const hasMarks = pluginsWrapper.getChanges("basic-text-format");
    this.indentChanges = pluginsWrapper.getChanges("indent");
    this.indentUtils = pluginsWrapper.getUtils("indent");
    this.listChanges = pluginsWrapper.getChanges("list");
    this.listUtils = pluginsWrapper.getUtils("list");
    this.alignChanges = pluginsWrapper.getChanges("align");
    this.alignUtils = pluginsWrapper.getUtils("align");
    this.historyUtils = pluginsWrapper.getUtils("history");
    this.currentTypography = hasTypography
      ? pluginsWrapper.getUtils("basic-typhography").currentTypography
      : () => true;
    this.typographies = {
      "heading-one": {
        icon: "Header",
        change: hasTypography
          ? pluginsWrapper.getChanges("basic-typhography").toggleTypography
          : () => {},
        disabled: !hasTypography
      },
      "heading-two": {
        icon: "Header2",
        change: hasTypography
          ? pluginsWrapper.getChanges("basic-typhography").toggleTypography
          : () => {},
        disabled: !hasTypography
      },
      "heading-three": {
        icon: "Header3",
        change: hasTypography
          ? pluginsWrapper.getChanges("basic-typhography").toggleTypography
          : () => {},
        disabled: !hasTypography
      },
      "heading-four": {
        icon: "Header4",
        change: hasTypography
          ? pluginsWrapper.getChanges("basic-typhography").toggleTypography
          : () => {},
        disabled: !hasTypography
      },
      paragraph: {
        icon: "Header5",
        change: hasTypography
          ? pluginsWrapper.getChanges("basic-typhography").toggleTypography
          : () => {},
        disabled: !hasTypography
      }
    };
    this.lists = {
      "ol-list": {
        icon: "ListOrdered",
        change: this.listChanges ? this.listChanges.changeListType : () => {},
        disabled: !this.listChanges,
        isActive: this.listUtils ? this.listUtils.isOrderedList : () => false
      },
      "ul-list": {
        icon: "ListBullet",
        change: this.listChanges ? this.listChanges.changeListType : () => {},
        disabled: !this.listChanges,
        isActive: this.listUtils ? this.listUtils.isUnorderedList : () => false
      },
      "check-list": {
        icon: "ListCheck",
        change: this.listChanges ? this.listChanges.changeListType : () => {},
        disabled: !this.listChanges,
        isActive: this.listUtils ? this.listUtils.isCheckList : () => false
      }
    };
    this.marks = {
      bold: {
        icon: "Bold",
        change: hasMarks
          ? pluginsWrapper.getChanges("basic-text-format").toggleBold
          : () => {},
        disabled: !hasMarks,
        isActive: hasMarks
          ? pluginsWrapper.getUtils("basic-text-format").isBold
          : () => false
      },
      italic: {
        icon: "Italic",
        change: hasMarks
          ? pluginsWrapper.getChanges("basic-text-format").toggleItalic
          : () => {},
        disabled: !hasMarks,
        isActive: hasMarks
          ? pluginsWrapper.getUtils("basic-text-format").isItalic
          : () => false
      },
      underline: {
        icon: "Underline",
        change: hasMarks
          ? pluginsWrapper.getChanges("basic-text-format").toggleUnderline
          : () => {},
        disabled: !hasMarks,
        isActive: hasMarks
          ? pluginsWrapper.getUtils("basic-text-format").isUnderline
          : () => false
      },
      strikethrough: {
        icon: "Strike",
        change: hasMarks
          ? pluginsWrapper.getChanges("basic-text-format").toggleStrikethrough
          : () => {},
        disabled: !hasMarks,
        isActive: hasMarks
          ? pluginsWrapper.getUtils("basic-text-format").isStrikethrough
          : () => false
      }
    };
    this.allignments = {
      left: {
        icon: "AlignLeft",
        change: this.alignChanges ? this.alignChanges.setAlign : () => {},
        disabled: !this.alignUtils,
        isActive: this.alignUtils ? this.alignUtils.isAligned : () => false
      },
      center: {
        icon: "AlignCenter",
        change: this.alignChanges ? this.alignChanges.setAlign : () => {},
        disabled: !this.alignUtils,
        isActive: this.alignUtils ? this.alignUtils.isAligned : () => false
      },
      right: {
        icon: "AlignRight",
        change: this.alignChanges ? this.alignChanges.setAlign : () => {},
        disabled: !this.alignUtils,
        isActive: this.alignUtils ? this.alignUtils.isAligned : () => false
      },
      justify: {
        icon: "AlignJustify",
        change: this.alignChanges ? this.alignChanges.setAlign : () => {},
        disabled: !this.alignUtils,
        isActive: this.alignUtils ? this.alignUtils.isAligned : () => false
      }
    };
  }

  handleClickMark = (event, change) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onChange(change(this.props.value.change()));
  };

  handleClickTypography = (event, change, type) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onChange(change(this.props.value.change(), type));
  };

  renderTyphography = () => {
    return Object.entries(this.typographies).map(([type, options]) => {
      return (
        <IconButton
          icon={options.icon}
          onMouseDown={e => this.handleClickTypography(e, options.change, type)}
          disabled={options.disabled || this.props.isReadOnly}
          active={this.currentTypography(this.props.value) === type}
          size="18"
        />
      );
    });
  };

  handleClickList = (event, change, type) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onChange(change(this.props.value.change(), type));
  };

  renderList = () => {
    return Object.entries(this.lists).map(([type, options]) => {
      return (
        <IconButton
          icon={options.icon}
          onMouseDown={e => this.handleClickList(e, options.change, type)}
          disabled={options.disabled || this.props.isReadOnly}
          active={options.isActive(this.props.value)}
          size="18"
        />
      );
    });
  };

  handleClickIndent = event => {
    event.preventDefault();
    event.stopPropagation();
    const change = this.props.value.change();
    const { value } = change;
    change.withoutNormalization(c => {
      this.indentChanges.increaseIndent(c);
    });
    this.props.onChange(change);
  };

  handleClickOutdent = event => {
    event.preventDefault();
    event.stopPropagation();
    const change = this.props.value.change();
    const { value } = change;
    change.withoutNormalization(c => {
      this.indentChanges.decreaseIndent(c);
    });
    this.props.onChange(change);
  };

  canBeIndented = () => {
    if (!this.indentUtils) return false;
    return this.indentUtils.canBeIndented(this.props.value);
  };

  canBeOutdented = () => {
    if (!this.indentUtils) return false;
    return this.indentUtils.canBeOutdented(this.props.value);
  };

  renderIndent = () => {
    return [
      <IconButton
        icon="Indent"
        onMouseDown={e => this.handleClickIndent(e)}
        disabled={this.props.isReadOnly || !this.indentUtils}
        size="18"
      />,
      <IconButton
        icon="Outdent"
        onMouseDown={e => this.handleClickOutdent(e)}
        disabled={this.props.isReadOnly || !this.indentUtils}
        size="18"
      />
    ];
  };

  handleClickAlignment = (event, change, type) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onChange(change(this.props.value.change(), type));
  };

  renderAllignment = () => {
    return Object.entries(this.allignments).map(([type, options]) => {
      return (
        <IconButton
          icon={options.icon}
          onMouseDown={e => this.handleClickAlignment(e, options.change, type)}
          disabled={
            options.disabled ||
            this.props.isReadOnly ||
            !this.alignUtils.isAlignable(this.props.value)
          }
          active={options.isActive(this.props.value, type)}
          size="18"
        />
      );
    });
  };

  renderMarks = () => {
    return Object.entries(this.marks).map(([type, options]) => {
      return (
        <IconButton
          icon={options.icon}
          onMouseDown={e => this.handleClickMark(e, options.change)}
          disabled={options.disabled || this.props.isReadOnly}
          active={options.isActive(this.props.value)}
          size="18"
        />
      );
    });
  };

  handleHistory = (event, type) => {
    event.preventDefault();
    event.stopPropagation();
    const handler =
      type === "undo"
        ? this.historyUtils.handleUndo
        : this.historyUtils.handleRedo;
    handler(this.props.value, this.props.value.change(), this.props.onChange);
  };

  hasHistory = type => {
    const check =
      type === "undo" ? this.historyUtils.hasUndo : this.historyUtils.hasRedo;
    return check(this.props.value);
  };

  renderHistories = () => {
    return this.hasHistory
      ? [
          <IconButton
            icon="Undo"
            onMouseDown={e => this.handleHistory(e, "undo")}
            disabled={!this.hasHistory("undo") || this.props.isReadOnly}
            size="18"
          />,
          <IconButton
            icon="Redo"
            onMouseDown={e => this.handleHistory(e, "redo")}
            disabled={!this.hasHistory("redo") || this.props.isReadOnly}
            size="18"
          />
        ]
      : null;
  };

  call = (change, options = []) => {
    this.props.onChange(this.props.value.change().call(change, ...options));
  };

  handleColorChange = (change, color) => {
    this.call(change, [color.hex]);
  };

  renderColorButton = (label, colors, icon) => {
    const { pluginsWrapper } = this.props;
    const colorChanges = pluginsWrapper.getChanges(label);
    const colorUtils = pluginsWrapper.getUtils(label);
    return colorUtils && colorChanges ? (
      <ColorPicker
        icon={icon}
        colors={colors}
        color={colorUtils.currentColor(this.props.value)}
        onChange={color =>
          this.handleColorChange(colorChanges.changeColor, color)
        }
        isReadOnly={this.props.isReadOnly}
      />
    ) : null;
  };

  renderTextColor = () => {
    return this.renderColorButton("colored-text", textColors, "Color");
  };

  renderBackgroundColor = () => {
    return this.renderColorButton(
      "background-colored-text",
      highlightColors,
      "Background"
    );
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
          background: "white"
        }}
      >
        {this.renderTyphography()}
        {this.renderIndent()}
        {this.renderAllignment()}
        {this.renderList()}
        {this.renderMarks()}
        {this.renderTextColor()}
        {this.renderBackgroundColor()}
        {this.renderHistories()}
      </div>
    );
  }
}
