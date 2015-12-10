// Include gulp
var gulp         = require("gulp"),
    uglify       = require('gulp-uglify'),
    sass         = require("gulp-sass"),
    jshint       = require('gulp-jshint'),
    stylish      = require('jshint-stylish'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    concat       = require('gulp-concat'),
    order        = require("gulp-order"),
    rename       = require('gulp-rename'),
    replace      = require('gulp-replace'),
    notify       = require("gulp-notify"),
    exec         = require('child_process').exec,
    file         = require('gulp-file');

/* Begin from Config.js */

var meta_webinars = [
  { slug : "social-sales" },
  { slug : "press-coverage" }
];


/* End from Config.js */

gulp.task('js', function(cb){
  return gulp.src(['js/main.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
	  .pipe(uglify())
    .pipe(rename('main-min.js'))
	  .pipe(gulp.dest('js/min/'))
    .pipe(notify("Main JS done."))

  cb(err);
});

gulp.task('sass', function () {
 gulp.src('sass/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
  .pipe(gulp.dest('css/'))
  .pipe(notify("SCSS to CSS done."))
});

// Use this to run default gulp

gulp.task('default', [
  'sass',
  'js'
], function(){});


gulp.task('new', function () {
  var slug;
  gulp.src([
    './js/**/*', 
    './css/**/*',
    './img/**/*',
    './index.html',
  ], {
    base: './'
  }).pipe(gulp.dest('new-webinar'))
});

gulp.task('build', [
  'default',
  'new'
], function(){});




