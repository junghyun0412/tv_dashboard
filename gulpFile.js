// including plugins
var gulp = require('gulp'), 
    browserSync = require('browser-sync').create(),
	minifyHtml = require("gulp-minify-html"),
	minifyCss = require("gulp-minify-css"),
	uglify = require("gulp-uglify"),
	//less = require("gulp-less"),
	//sass = require("gulp-sass"),
	jshint = require("gulp-jshint"),
	concat = require("gulp-concat"),
	nodemon = require('gulp-nodemon'),
	_paths = ['app/*.js', 'public/js/*.js'];
 
// task
gulp.task('minify-public-html', function () {
    gulp.src(['public/*.html']) // path to your files
		.pipe(minifyHtml())
		.pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function () {
    gulp.src('public/css/*.css') // path to your file
    .pipe(minifyCss())
    .pipe(gulp.dest('public/css'));
});

gulp.task('minify-js', function () {
    gulp.src('public/js/*.js') // path to your files
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

/*
gulp.task('compile-less', function () {
    gulp.src('public/less/*.less') // path to your file
    .pipe(less())
    .pipe(gulp.dest('public/less'));
});

gulp.task('compile-sass', function () {
    gulp.src('public/sass/*.sass') // path to your file
    .pipe(sass())
    .pipe(gulp.dest('public/sass'));
});
*/

gulp.task('jsLint', function () {
    gulp.src('public/js/*.js') // path to your files
    .pipe(jshint())
    .pipe(jshint.reporter()); // Dump results  Ex: .pipe(jshint.reporter('default'));
});

/*
gulp.task('concat', function () {
    gulp.src('public/js/*.js') // path to your files
    .pipe(concat('concat.js'))  // concat and name it "concat.js"
    .pipe(gulp.dest('public/js'));
});
*/

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init({
        proxy: "http://localhost:8080",
		port: 8080
		//browser: "google chrome",
		//localOnly: true
    });
});

//register nodemon task
gulp.task('nodemon', function() {
	nodemon({
	  script: 'server.js',
	  env: {
		'NODE_ENV': 'development'
	  }
	})
	.on('restart');
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browser-sync'], function() {});



