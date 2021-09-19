'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

//Compile scss into css
function style() {
  //1. Find scss file
  return gulp.src('./sass/*.scss')
  //2. Pass file through sass compiler
  .pipe(sass().on('error', sass.logError))
  //3. Choose destination for compiled css
  .pipe(gulp.dest('./css'))
  //4.Sync changes to browser
  .pipe(browserSync.stream())
};

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./sass/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/*.scss').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;