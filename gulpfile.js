const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const bs = require("browser-sync");
const mustache = require("gulp-mustache");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const fs = require("fs");

function styles() {
  return gulp
    .src("src/styles/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("./dist"))
    .pipe(bs.reload({ stream: true }));
};

function templates() {
  var content = fs.readFileSync("src/data/data.json");
  var data = JSON.parse(content);
  var pages = "src/templates/{index,portfolio}.mustache";
  return gulp
    .src(pages)
    .pipe(mustache(data, { extension: ".html" }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"));
};

function scripts() {
  return gulp
    .src("src/scripts/*.js")
    .pipe(rename("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist"));
};

function sync() {
  bs.init({
    server: "./dist",
    open: false,
    notify: false
  });
};

function refresh(done) {
  bs.reload();
  done();
}

function watch() {
  gulp.watch("src/styles/**/*.scss", styles)
  gulp.watch(["src/**/*.mustache", "src/data/*.json"], gulp.series(templates, refresh))
  gulp.watch("src/scripts/*.js", gulp.series(scripts, refresh))
};

exports.styles = styles;
exports.templates = templates;
exports.scripts = scripts;
exports.build = gulp.parallel(templates, styles, scripts)
exports.default = gulp.parallel(watch, templates, styles, scripts, sync)
