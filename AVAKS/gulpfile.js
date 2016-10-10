var gulp = require('gulp'),
	watch = require('gulp-watch'),
	jade = require('gulp-jade'),
	less = require('gulp-less'),
	svgstore = require('gulp-svgstore'),
	svgmin = require('gulp-svgmin');


gulp.task('jade', function(){
	return gulp.src('jade/**/*.jade')
		.pipe(jade({
            pretty: true
        }))
		.pipe(gulp.dest(''));
});

gulp.task('svgstore', function () {
    return gulp
        .src('assets/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('img'));
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