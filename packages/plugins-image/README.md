# @Vericus / Slate Kit Image

Replaces the slatekit image with an feature-extendable image block.

## Documentation

<!-- %docs
title: Slate Kit Image
-->

### Options:

```js
customOptions = {
  renderer: CustomImageRenderer,
  maxFileSize: 5000000,
  uploadImage: imageUpload
};
```

#### Custom Image Renderer

Example: See `DefaultImageRenderer.js` in how to construct your own custom image renderer.

#### Upload Image Function

Provide a promise that returns a url, given a file.
Example:

```js
const imageUpload = file => {
  const data = new FormData();
  data.append("file", file);
  return fetch("http://localhost:4000/api/upload", {
    method: "POST",
    body: data,
    "Content-Type": file.type
  }).then(resp => {
    return resp.text();
  });
};
```

<!-- %enddocs -->

## License

[MIT](./LICENSE.txt) &copy; [`slate-kit`](https://github.com/Vericus/slate-kit)
