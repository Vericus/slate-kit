const fs = require("fs-extra");
const path = require("path");
const globby = require("globby");

const preprocessDestPath = (srcPath, dest) => {
  let basename = path.basename(srcPath);
  return path.join(dest, basename);
};

(async () => {
  const env = process.env;
  if (
    !// if INIT_CWD (yarn/npm install invocation path) and PWD
    // are the same, then local (dev) install/add is taking place
    (
      env.INIT_CWD === env.PWD ||
      // local (dev) yarn install may have been run
      // from a project subfolder
      env.INIT_CWD.indexOf(env.PWD) === 0
    )
  ) {
    for (const file of await fs.readdir("types")) {
      if ((await fs.stat(path.join("types", file))).isDirectory()) {
        for (const matchFile of await globby([
          `types/${file}/*`,
          "!types/**/**-tests.ts"
        ])) {
          const dest = preprocessDestPath(
            matchFile,
            path.join("../../@types", file)
          );
          await fs.ensureDir(path.join("../../@types", file));
          fs.copyFileSync(matchFile, dest);
        }
      }
    }
  }
})();
