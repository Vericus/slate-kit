run the command bellow to release as it doesn't work as expected as npm script:

```sh
lerna exec --bail=false -- "can-npm-publish --verbose && npm publish"
```
