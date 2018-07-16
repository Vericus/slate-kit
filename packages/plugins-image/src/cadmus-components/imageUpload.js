const imageUpload = (file, updateSrc, updateErrors) => {
  let data = new FormData();
  data.append("file", file);
  fetch("http://localhost:4000/api/upload", {
    method: "POST",
    body: data,
    "Content-Type": file.type
  })
    .then(resp => {
      return resp.text();
    })
    .then(newUrl => {
      updateSrc(newUrl);
    })
    .catch(e => {
      updateSrc();
      updateErrors("Failed to upload file to server");
    });
};

export default imageUpload;
