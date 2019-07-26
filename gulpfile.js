const fs = require("fs");
const del = require("del");
const gulp = require("gulp");
const sass = require("gulp-sass");
const bs = require("browser-sync");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const mustache = require("gulp-mustache");
const autoprefixer = require("gulp-autoprefixer");

function styles(done) {
  return gulp
    .src("src/styles/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("./dist"))
    .pipe(bs.reload({ stream: true }));
  done();
};

function templates(done) {
  var content = fs.readFileSync("src/data/data.json");
  var data = JSON.parse(content);
  var pages = "src/templates/{index,portfolio}.mustache";
  return gulp
    .src(pages)
    .pipe(mustache(data, { extension: ".html" }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"));
  done();
};

function scripts(done) {
  return gulp
    .src("src/scripts/*.js")
    .pipe(rename("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist"));
  done();
};

function sync(done) {
  bs.init({
    server: "./dist",
    open: false,
    notify: false
  });
};

function watch() {
  gulp.watch("src/styles/**/*.scss", styles)
  gulp.watch(["src/**/*.mustache", "src/data/*.json"], gulp.series(templates, refresh))
  gulp.watch("src/scripts/*.js", gulp.series(scripts, refresh))
};

function refresh(done) {
  bs.reload();
  done();
}

function copyAssets(done) {
  return gulp
    .src("src/assets/**", { dot: true })
    .pipe(gulp.dest("./dist"));
  done();
}

function clean(done) {
  return del(["./dist"]);
  done();
}

const build = gulp.series(clean, gulp.parallel(copyAssets, templates, styles, scripts));

exports.styles = styles;
exports.templates = templates;
exports.scripts = scripts;
exports.copyAssets = copyAssets;
exports.build = build;
exports.default = gulp.parallel(build, watch, sync)
