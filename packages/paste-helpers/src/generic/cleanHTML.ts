// remove everything from HTML string except the content of <body/>
export default function cleanHTML(html: string): string {
  const dom = new DOMParser().parseFromString(html, "text/html");
  return (dom && dom.body && dom.body.innerHTML) || "";
}
