# [@Vericus / Basic Text Formatting](https://github.com/Vericus/slate-kit/tree/master/packages/plugins-features-basic-text-formatting)

> Plugins that provides `expected` functionality on `strike-through, underlined, bold, italicised` text on slate

## Documentation

<!-- %docs
title: Basic Text Formatting
-->

[Slate](https://github.com/ianstormtaylor/slate) plugin that provides `expected` functionality on `strike-through, underlined, bold, italicised` text such as keyboard shortcuts, helpers that can be used to trigger changes on toolbars, and optional renderer using [@vericus/slate-kit-basic-text-formatting-renderer](https://github.com/Vericus/slate-kit/tree/master/packages/plugins-renderer-basic-text-formatting)

this plugin is configurable through options on the keybindings and whether the renderer for `strike-through, underlined, bold, italicised` are being provided externally or not

```js
{
  keyBindings: [
    { hotkeys: "mod+b", changeName: "toggleBold" },
    { hotkeys: "mod+i", changeName: "toggleItalic" },
    { hotkeys: "mod+u", changeName: "toggleUnderline" }
  ],
  externalRenderer: false
}
```

<!-- %enddocs -->

## License

[MIT](./LICENSE.txt) &copy; [`slate-kit`](https://github.com/Vericus/slate-kit)
