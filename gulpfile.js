'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const cleanCss = require('gulp-clean-css');
const purgeCss = require('gulp-purgecss');
const autoPrefixer = require('gulp-autoprefixer');
const extensionRename = require('gulp-rename');

//Compile SCSS files into standard CSS
function style() {
  //1. Find scss file
  return (
    gulp
      .src('./sass/*.scss')
      //2. Pass file through sass compiler
      .pipe(sass().on('error', sass.logError))
      //3. Choose destination for compiled css
      .pipe(gulp.dest('./css'))
      //4.Sync changes to browser
      .pipe(browserSync.stream())
  );
}

//Allows watching files and running the functions when a change occurs
function watch() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  gulp.watch('./sass/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/*.js').on('change', browserSync.reload);
}

function start() {
  style();
  watch();
}

//To clean and compress css for final build
function buildCss(done) {
  gulp
    .src('./css/style.css')
    .pipe(
      purgeCss({
        content: ['./**/*.html'],
      })
    )
    .pipe(autoPrefixer())
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(
      extensionRename(function (path) {
        path.extname = '.min.css';
      })
    )
    .pipe(gulp.dest('./css/'));
  done();
}

exports.style = style;
exports.watch = watch;
exports.start = start;
exports.purgeCss = purgeCss;
exports.autoPrefixer = autoPrefixer;
exports.cleanCss = cleanCss;
exports.buildCss = buildCss;
