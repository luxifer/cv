var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');

gulp.task('js', function() {
    gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'assets/js/app.js'
        ])
        .pipe(concat('cv.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('less', function() {
    return gulp.src('assets/less/app.less')
        .pipe(less())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('css', ['less'], function() {
    return gulp.src([
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/font-awesome/css/font-awesome.css',
            'assets/css/app.css'
        ])
        .pipe(concat('cv.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'));
});

gulp.task('data', function() {
    gulp.src('bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('default', ['js', 'less', 'css', 'data'], function() {
    // place code for your default task here
});
