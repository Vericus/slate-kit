function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

import { Record } from "immutable";
import "slate";

var Options = (function(_Record) {
  _inherits(Options, _Record);

  function Options() {
    _classCallCheck(this, Options);

    return _possibleConstructorReturn(
      this,
      (Options.__proto__ || Object.getPrototypeOf(Options)).apply(
        this,
        arguments
      )
    );
  }

  return Options;
})(Record({ hotkeys: null, change: function change() {} }));

export default Options;
