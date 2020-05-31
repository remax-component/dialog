const { src, dest, parallel, watch, series } = require("gulp");
const ts = require("gulp-typescript");
const less = require("gulp-less");
const copy = require("gulp-copy");

const tsProject = ts.createProject("tsconfig.json");

function TypeScript() {
  return src("src/**/*.tsx").pipe(tsProject()).pipe(dest("dist/"));
}

function Less() {
  return src("assets/**/*.less").pipe(less()).pipe(dest("dist/assets"));
}

function Copy() {
  return src(["package.json", "dist/**/*"]).pipe(
    copy("example/node_modules/@remax-component/dialog")
  );
}

exports.build = series(parallel(TypeScript, Less), Copy);

exports.watch = function () {
  series(exports.build, Copy)();
  watch("src/**/*.tsx", series(TypeScript, Copy));
  watch("assets/**/*.less", series(Less, Copy));
};
