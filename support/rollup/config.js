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
        buildOrder: 3
      };
    } else if (/util/gi.test(pkg.package.name)) {
      return {
        ...pkg,
        buildOrder: 2
      };
    } else if (/wrapper/gi.test(pkg.package.name)) {
      return {
        ...pkg,
        buildOrder: 1
      };
    } else if (/hotkey/gi.test(pkg.package.name)) {
      return {
        ...pkg,
        buildOrder: 4
      };
    }
    return {
      ...pkg,
      buildOrder: 5
    };
  })
  .sort((pkg1, pkg2) => pkg1.buildOrder - pkg2.buildOrder)
  .reduce(
    (acc, { package: pkg, location }) => [...acc, ...factory(pkg, location)],
    []
  );

export default configurations;
