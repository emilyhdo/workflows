var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var compass = require('gulp-compass');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = ['components/scripts/pixgrid.js', 
				'components/scripts/rclick.js',
				'components/scripts/tagline.js',
				'components/scripts/template.js'];
var scssSources = ['components/sass/style.scss'];
var htmlSources = ['builds/development/*.html'];
var jsonSources = ['builds/development/js/*.json'];
var imagesSources = ['builds/development/images/**/*.*'];

gulp.task('coffee', function(){
	gulp.src(coffeeSources)
		.pipe(coffee({bare: true}).on('error', gutil.log))
		.pipe(gulp.dest('components/scripts/'));

});

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js/'))
		.pipe(connect.reload());

});

gulp.task('compass', function(){
	gulp.src(scssSources)
		.pipe(compass({
			sass: 'components/sass',
			image: 'builds/development/images',
			style: 'expanded'
		}).on('error', gutil.log))
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
	gulp.watch(jsonSources, ['json']);
	gulp.watch(imagesSources, ['images']);
});

gulp.task('connect', function() { 
  connect.server({
  	root: "builds/development",
  	livereload: true
  });
});

gulp.task('html', function(){
	gulp.src(htmlSources)
		.pipe(connect.reload());
});

gulp.task('json', function(){
	gulp.src(jsonSources)
		.pipe(connect.reload());
});

gulp.task('images', function(){
	gulp.src(imagesSources)
		.pipe(connect.reload());	
});

gulp.task('default', ['coffee', 'js', 'compass', 'connect', 'watch']);



