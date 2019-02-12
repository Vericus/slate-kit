// remove unnecessary wrapping <b/> that will be pasted over from google docs
export default async function cleanHTML(html: string): Promise<string> {
  return new Promise((resolve, reject) => {
    resolve(html.replace(/^.* id="docs-internal-guid[^>]*>(.*)<\/b>.*$/, "$1"));
  });
}
