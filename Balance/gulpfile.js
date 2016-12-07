var gulp = require('gulp'),
	watch = require('gulp-watch'),
	jade = require('gulp-jade'),
	less = require('gulp-less');

gulp.task('jade', function(){
	return gulp.src('jade/**/*.jade')
		.pipe(jade({
            pretty: true
        }))
		.pipe(gulp.dest(''));
});

gulp.task('less', function(){
	return gulp.src('less/*.less')
		.pipe(less())
		.pipe(gulp.dest('css'));
});

gulp.task('watch', function(){
	gulp.watch('jade/**/*.jade', ['jade']);
	gulp.watch('less/**/*.less', ['less']);
});