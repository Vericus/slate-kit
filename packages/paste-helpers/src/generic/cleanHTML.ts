// remove everything from HTML string except the content of <body/>
export default async function cleanHTML(html: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const dom = new DOMParser().parseFromString(html, "text/html");
    resolve((dom && dom.body && dom.body.innerHTML) || "");
  });
}
