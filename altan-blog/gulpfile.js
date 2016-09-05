var gulp = require('gulp'),
	watch = require('gulp-watch'),
	jade = require('gulp-jade'),
	less = require('gulp-less'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename');

gulp.task('jade', function(){
	return gulp.src('templates/**/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('builds/dev'));
});

gulp.task('less', function(){
	return gulp.src('less/*.less')
		.pipe(less())
		.pipe(gulp.dest('builds/dev/css'));
});

gulp.task('minify-css', function(){
	gulp.src('builds/dev/css/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('builds/dev/css'));
});

gulp.task('watch', function(){
	gulp.watch('templates/**/*.jade', ['jade']);
	gulp.watch('less/**/*.less', ['less']);
});

