# @Vericus / Typescript typings

> This package is a Typescript typeRoot of all typings of external packages that otherwise have no types of their own.

## Documentation

<!-- %docs
title: Slate Kit Typescript typings
-->

## Reasoning

`Slate`'s typescript definition are pretty new on the main `DefinitelyTyped` repository, the update to it is much slower than the speed of development of `Slate`. We're using this package to increase the velocity repository of updating types. All the types will be a port of what's in `DefinitelyTyped` repository and will be ported back as regular as we can.

## Usage

Install this package.

```bash
yarn add --dev @vericus/slate-kit-typescript-typings
```

Update your `tsconfig.json` to include additional type root.

```
{
  {
  "compilerOptions": {
    "typeRoots": ["node_modules/@vericus/slate-kit-typescript-typings/types", "node_modules/@types"]
  }
}
```

Proceed as normal, happier.

<!-- %enddocs -->

## License

[MIT](./LICENSE.txt) &copy; [GitHub](https://github.com/)
