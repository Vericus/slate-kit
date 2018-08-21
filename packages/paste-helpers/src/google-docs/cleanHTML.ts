// remove unnecessary wrapping <b/> that will be pasted over from google docs
export default function cleanHTML(html: string) {
  return html.replace(/^.* id="docs-internal-guid[^>]*>(.*)<\/b>.*$/, "$1");
}
