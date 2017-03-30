var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var bs = require('browser-sync');
var mustache = require('gulp-mustache');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var fs  = require('fs');

// Run Browsersync
gulp.task('browser-sync', function() {
  bs.init({
    server: './dist',
    port: 8080,
    notify: false
  });
});

//Compile and minify Sass
gulp.task('sass', function() {
  gulp.src('src/styles/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(bs.reload({stream: true}));
});

//Compile Mustache
gulp.task('mustache', function() {
  var content = fs.readFileSync('src/data/data.json');
  var data = JSON.parse(content);
  var pages = 'src/templates/{index,portfolio}.mustache'
  gulp.src(pages)
    .pipe(mustache(data, {extension: '.html'}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
});

//Minify JS
gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

//Watch Files
gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', ['sass']);
  gulp.watch('src/**/*.mustache', ['mustache']).on('change', bs.reload);
  gulp.watch('src/data/*.json', ['mustache']).on('change', bs.reload);
  gulp.watch('src/scripts/*.js', ['scripts']).on('change', bs.reload);
});

//Set up default task
gulp.task('default',['watch', 'mustache', 'sass', 'scripts', 'browser-sync']);
