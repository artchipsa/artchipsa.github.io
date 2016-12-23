var gulp = require('gulp'),
	watch = require('gulp-watch'),
	less = require('gulp-less');

gulp.task('less', function(){
	return gulp.src('static/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('static/css'));
});

gulp.task('watch', function(){
	gulp.watch('static/less/**/*.less', ['less']);
});