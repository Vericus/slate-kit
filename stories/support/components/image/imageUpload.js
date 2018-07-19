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

export default imageUpload;
