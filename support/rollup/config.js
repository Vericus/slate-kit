import getPackages from "lerna-get-packages";
import factory from "./factory";

const configurations = getPackages(__dirname)
  .filter(
    pkg =>
      pkg.package["slate-kit"] && pkg.package["slate-kit"].type === "module"
  )
  .reduce(
    (acc, { package: pkg, location }) => [...acc, ...factory(pkg, location)],
    []
  );

export default configurations;
