var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');

gulp.task('js', function() {
    gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
        ])
        .pipe(concat('cv.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('static/js'));
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
            'bower_components/flag-icon-css/css/flag-icon.css',
            'assets/css/app.css'
        ])
        .pipe(concat('cv.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('static/css'));
});

gulp.task('data', function() {
    gulp.src('bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest('static/fonts'));

    gulp.src([
        'bower_components/flag-icon-css/flags/1x1/fr.svg',
        'bower_components/flag-icon-css/flags/1x1/gb.svg'
    ])
    .pipe(gulp.dest('static/flags/1x1/'))
});

gulp.task('default', ['js', 'less', 'css', 'data'], function() {
    // place code for your default task here
});
