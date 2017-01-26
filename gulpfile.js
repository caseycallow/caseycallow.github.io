var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var mustache = require("gulp-mustache");

// browser-sync
gulp.task('browser-sync', ['sass'], function() {
  bs.init({
    server: "./",
    port: 8080
  });
});

//Compile Sass
gulp.task('sass', function () {
  gulp.src('src/styles/scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('src/styles/css/'))
  .pipe(bs.reload({stream: true}));
});

//Compile Mustache
// gulp.task('mustache', function () {
//   gulp.src("src/templates/*.mustache")
//     .pipe(mustache({
//       msg: "Compiling Mustache templates"
//     }))
//     //need gulp-rename to change mustache to html
//     //watch needs to look at mustache files
//     .pipe(gulp.dest("./dist"));
// });

//Watch Files
gulp.task('watch', ['browser-sync'], function () {
  gulp.watch("src/styles/scss/**/*.scss", ['sass']);
  gulp.watch("*.html").on('change', bs.reload);
});

gulp.task('default',['watch', 'sass', 'browser-sync']);
