import getData from "./getData";

export default function createStyle() {
  return { getData: (el: HTMLElement) => getData(el) };
}
