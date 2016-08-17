var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var compass = require('gulp-compass');
var browserify = require('gulp-browserify');


var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = ['components/scripts/pixgrid.js', 
				'components/scripts/rclick.js',
				'components/scripts/tagline.js',
				'components/scripts/template.js'];
var scssSources = ['components/sass/style.scss'];

gulp.task('coffee', function(){
	gulp.src(coffeeSources)
		.pipe(coffee({bare: true}).on('error', gutil.log))
		.pipe(gulp.dest('components/scripts/'));

});

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js/'));

});

gulp.task('compass', function(){
	gulp.src(scssSources)
		.pipe(compass({
			sass: 'components/sass',
			image: 'builds/development/images',
			style: 'expanded'
		}).on('error', gutil.log))
		.pipe(gulp.dest('builds/development/css'));
});

