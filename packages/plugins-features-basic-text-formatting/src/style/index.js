// @flow
import getData from "./getData";

export default function createStyle() {
  return { getData: el => getData(el) };
}
