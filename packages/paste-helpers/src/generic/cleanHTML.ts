// remove everything from HTML string except the content of <body/>
export default function cleanHTML(html: string): string {
  return html.replace(
    /[.\s\S\w\W<>]*<body[^>]*>([.\s\S\w\W<>]*)<\/body>[.\s\S\w\W<>]*/gi,
    "$1"
  );
}
