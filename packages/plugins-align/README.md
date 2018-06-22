# [@Vericus / Slate Kit Align](https://github.com/Vericus/slate-kit/tree/master/packages/plugins-align)

> Plugins to provide a way to align blocks on slate

## Documentation

<!-- %docs
title: Slate Kit Align
-->

[Slate](https://github.com/ianstormtaylor/slate) plugin that provides a way to align blocks for [`slate-kit`](https://github.com/Vericus/slate-kit).
It accepts a few configurable `options` for what kind of blocks(floating/text) can be aligned and the `dataField` that it use to store the alignment position.

sample options:

```js
{
  floatBlocks: [],
  textBlocks: [
    "paragraph",
    "heading-one",
    "heading-two",
    "heading-three",
    "heading-four"
  ],
  dataField: "textAlign"
}
```

<!-- %enddocs -->

## License

[MIT](./LICENSE.txt) &copy; [`slate-kit`](https://github.com/Vericus/slate-kit)
