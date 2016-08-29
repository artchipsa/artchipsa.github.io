var gulp = require('gulp'),
	watch = require('gulp-watch'),
	jade = require('gulp-jade'),
	less = require('gulp-less'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename');


gulp.task('jade', function(){
	return gulp.src('jade/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest(''));
});

gulp.task('less', function(){
	return gulp.src('less/*.less')
		.pipe(less())
		.pipe(gulp.dest('css'));
});

gulp.task('minify-css', function(){
	gulp.src('css/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('css'));
});

gulp.task('watch', function(){
	gulp.watch('jade/**/*.jade', ['jade']);
	gulp.watch('less/**/*.less', ['less']);
});