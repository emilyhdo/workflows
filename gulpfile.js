var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var compass = require('gulp-compass');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

var outputDir;
var env = process.env.NODE_ENV || "development";

if (env === "development"){
	outputDir = "builds/development/";
}else{
	outputDir = "builds/production/";
}

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = ['components/scripts/pixgrid.js', 
				'components/scripts/rclick.js',
				'components/scripts/tagline.js',
				'components/scripts/template.js'];
var scssSources = ['components/sass/style.scss'];
var htmlSources = [outputDir + '*.html'];
var jsonSources = [outputDir + 'js/*.json'];
var imagesSources = [outputDir + 'images/**/*.*'];

gulp.task('coffee', function(){
	gulp.src(coffeeSources)
		.pipe(coffee({bare: true}).on('error', gutil.log))
		.pipe(gulp.dest('components/scripts/'));

});

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js/'))
		.pipe(connect.reload());

});

gulp.task('compass', function(){
	gulp.src(scssSources)
		.pipe(compass({
			sass: 'components/sass',
			image: outputDir + 'images',
			style: 'expanded'
		}).on('error', gutil.log))
		.pipe(gulp.dest(outputDir + 'css'))
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
  	root: outputDir,
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



