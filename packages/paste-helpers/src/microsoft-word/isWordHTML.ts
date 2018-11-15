export default function isWordHTML(html: string): boolean {
  return (
    html
      .toString()
      .match(/(class="?Mso|style="[^"]*\bmso-|w:WordDocument)/gi) !== null
  );
}
