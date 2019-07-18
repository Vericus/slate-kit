import * as tslib_1 from "tslib";
import Register from "@vericus/slate-kit-utils-register-helpers";
import HTML from "slate-html-serializer";
function HTMLSerializer() {
  var rules = [];
  var serializers = new HTML();
  var dataGetter = [];
  function createRule(_options, editor) {
    return [
      {
        deserialize: function(el, next) {
          if (!el.tagName || el.tagName.toLowerCase() !== "div") {
            return undefined;
          }
          if (!el.textContent || (el.textContent && el.textContent !== "")) {
            return undefined;
          }
          var _a = editor.getData(el),
            data = _a.data,
            marks = _a.marks;
          return {
            object: "block",
            data: data,
            marks: marks,
            type: "paragraph",
            nodes: next(el.childNodes)
          };
        }
      },
      {
        deserialize: function(el, next) {
          if (
            el.parentNode &&
            el.parentNode.parentNode &&
            el.parentNode.parentNode instanceof HTMLElement &&
            el.parentNode.parentNode.tagName.toLowerCase() === "div"
          ) {
            return undefined;
          }
          if (
            el.parentNode &&
            el.parentNode instanceof HTMLElement &&
            el.parentNode.tagName.toLowerCase() === "li"
          ) {
            return undefined;
          }
          if (el.nodeName === "#text") return undefined;
          if (
            el.firstChild &&
            el.firstChild.nodeName !== "#text" &&
            el.firstChild.firstChild &&
            el.firstChild.firstChild.nodeName !== "#text"
          ) {
            return undefined;
          }
          if (el.firstChild && el.firstChild.nodeName === "#text") {
            return undefined;
          }
          if (!el.textContent || (el.textContent && el.textContent !== "")) {
            return undefined;
          }
          var _a = editor.getData(el),
            data = _a.data,
            marks = _a.marks;
          return {
            object: "block",
            data: data,
            marks: marks,
            type: "paragraph",
            nodes: next(el.childNodes)
          };
        }
      }
    ];
  }
  return [
    Register({ createRule: createRule }),
    {
      queries: {
        registerHTMLRule: function(editor, newRules) {
          if (Array.isArray(newRules)) {
            rules = tslib_1.__spread(rules, newRules);
          } else {
            rules = tslib_1.__spread(rules, [newRules]);
          }
          serializers = new HTML({ rules: rules });
        },
        registerDataGetter: function(_editor, getter) {
          dataGetter = tslib_1.__spread(dataGetter, [getter]);
        },
        getData: function(editor, element) {
          return dataGetter.reduce(function(memo, getter) {
            var passData = getter(editor, element);
            var marks = tslib_1.__spread(
              memo.marks ? memo.marks : [],
              passData.marks ? passData.marks : []
            );
            var data = tslib_1.__assign({}, memo.data, passData.data);
            return {
              data: data,
              marks: marks
            };
          }, {});
        },
        getHTMLSerializer: function(_editor) {
          return serializers;
        },
        deserializeHTML: function(_editor, html) {
          return serializers.deserialize(html);
        }
      }
    }
  ];
}
export default HTMLSerializer;
//# sourceMappingURL=index.js.map
