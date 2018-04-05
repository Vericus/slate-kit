import getPackages from "lerna-get-packages";
import factory from "./factory";

const configurations = getPackages(__dirname).reduce(
  (acc, { package: pkg, location }) => [...acc, ...factory(pkg, location)],
  []
);

export default configurations;
