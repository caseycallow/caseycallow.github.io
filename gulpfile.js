var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var bs = require('browser-sync').create();
var mustache = require('gulp-mustache');
var htmlbeautify = require('gulp-html-beautify');
var fs  = require('fs');

// Run Browsersync
gulp.task('browser-sync', ['sass'], function() {
  bs.init({
    server: './',
    port: 8080
  });
});

//Compile SASS
gulp.task('sass', function () {
  gulp.src('src/styles/scss/*.scss')
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('src/styles/css/'))
    .pipe(bs.reload({stream: true}));
});

//Compile Mustache
gulp.task('mustache', function() {
  var content = fs.readFileSync('src/data/data.json');
  var data = JSON.parse(content);
  var pages = 'src/pages/*.mustache'
  gulp.src(pages)
    .pipe(mustache(data, {extension: '.html'}))
    .pipe(htmlbeautify({indent_with_tabs: true}))
    .pipe(gulp.dest('./'));
});

//Watch Files
gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('src/styles/scss/**/*.scss', ['sass']);
  gulp.watch('src/**/*.mustache', ['mustache']).on('change', bs.reload);
  gulp.watch('src/data/*.json', ['mustache']).on('change', bs.reload);
  gulp.watch('src/scripts/*.js').on('change', bs.reload);
});

//Set up default task
gulp.task('default',['watch', 'mustache', 'sass', 'browser-sync']);
