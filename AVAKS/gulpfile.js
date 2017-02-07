var gulp = require('gulp'),
	watch = require('gulp-watch'),
	jade = require('gulp-jade'),
	less = require('gulp-less'),
	svgstore = require('gulp-svgstore'),
    connect = require('gulp-connect');
    livereload = require('gulp-livereload');
	svgmin = require('gulp-svgmin');


gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('jade', function(){
	return gulp.src('jade/**/*.jade')
		.pipe(jade({
            pretty: true
        }))
		.pipe(gulp.dest(''))
        .pipe(connect.reload());
});

gulp.task('js', function(){
    gulp.src('js/*.js')
    .pipe(connect.reload());
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
		.pipe(gulp.dest('css'))
        .pipe(connect.reload());
});


gulp.task('watch', function(){
	gulp.watch('jade/**/*.jade', ['jade']);
	gulp.watch('less/**/*.less', ['less']);
    gulp.watch('js/*.js', ['js']);
});

gulp.task('default', ['connect', 'watch']);