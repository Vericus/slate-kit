import path from "path";
import getPackages from "get-monorepo-packages";
import factory from "./factory";

const configurations = getPackages(path.resolve("."))
  .filter(
    pkg =>
      pkg.package["slate-kit"] && pkg.package["slate-kit"].type === "module"
  )
  .reduce(
    (acc, { package: pkg, location }) => [...acc, ...factory(pkg, location)],
    []
  );

export default configurations;
