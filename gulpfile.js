var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');

gulp.task('less', function() {
    return gulp.src('assets/less/app.less')
        .pipe(less())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('css', ['less'], function() {
    return gulp.src([
            'assets/css/app.css'
        ])
        .pipe(concat('cv.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['less', 'css'], function() {
    // place code for your default task here
});
