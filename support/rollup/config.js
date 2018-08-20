import path from "path";
import getPackages from "get-monorepo-packages";
import factory from "./factory";

const configurations = getPackages(path.resolve("."))
  .filter(
    pkg =>
      pkg.package["slate-kit"] && pkg.package["slate-kit"].type === "module"
  )
  .map(pkg => {
    if (/renderer/gi.test(pkg.package.name)) {
      return {
        ...pkg,
        buildOrder: 1
      };
    } else if (/util/gi.test(pkg.package.name)) {
      return {
        ...pkg,
        buildOrder: 0
      };
    }
    return {
      ...pkg,
      buildOrder: 2
    };
  })
  .sort((pkg1, pkg2) => pkg1.buildOrder - pkg2.buildOrder)
  .reduce(
    (acc, { package: pkg, location }) => [...acc, ...factory(pkg, location)],
    []
  );

export default configurations;
