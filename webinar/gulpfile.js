// Include gulp
var gulp         = require("gulp"),
    uglify       = require('gulp-uglify'),
    sass         = require("gulp-sass"),
    jshint       = require('gulp-jshint'),
    stylish      = require('jshint-stylish'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    replace      = require('gulp-replace'),
    notify       = require("gulp-notify");

/* Begin from Config.js */

var title = "Social Sales: Dos and Don'ts with Close.io and Workable";
var description = "Join our CEO Matthieu Vaxelaire for a live Q&amp;A about social sales with Steli and Rob on Thursday, December 10th at 1 pm EST / 10 am PST.";
var webinar_img = "https://mention.com/wp-content/uploads/2015/12/dos-donts-us-grey.png";

/* End from Config.js */

gulp.task('composite', function(cb){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
	  .pipe(concat('composite.js'))
	  .pipe(rename('composite-min.js'))
	  .pipe(uglify())
	  .pipe(gulp.dest('js/min/'))
    .pipe(notify("Main composite done."))

  cb(err);
});

gulp.task('sass', function () {
 gulp.src('sass/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
  .pipe(gulp.dest('css/'))
  .pipe(notify("SCSS to CSS done."))
});

gulp.task('replace', function(){
  gulp.src(['index.html'])
    .pipe(replace('{{img}}', webinar_img))
    .pipe(replace('{{title}}', title))
    .pipe(replace('{{description}}', description))
    .pipe(gulp.dest("./"))
    .pipe(notify("Replaced"));
});

gulp.task('default', [
  'sass',
  'composite',
  'replace'
  ], function(){});