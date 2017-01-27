var gulp = require('gulp');
var sass = require('gulp-sass');
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
    .pipe(sass())
    .pipe(gulp.dest('src/styles/css/'))
    .pipe(bs.reload({stream: true}));
});

//Compile Mustache
gulp.task('mustache', function() {
  var content = fs.readFileSync('./src/data/data.json');
  var components = JSON.parse(content);
  gulp.src('./src/components/index.mustache')
    .pipe(mustache(components, {extension: '.html'}))
    .pipe(htmlbeautify({indent_with_tabs: true}))
    .pipe(gulp.dest('./'));
})

//Watch Files
gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('src/styles/scss/**/*.scss', ['sass']);
  gulp.watch('src/components/*.mustache', ['mustache']).on('change', bs.reload);
  gulp.watch('src/scripts/*.js').on('change', bs.reload);
});

//Set up default task
gulp.task('default',['watch', 'mustache', 'sass', 'browser-sync']);
