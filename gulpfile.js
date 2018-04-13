const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

gulp.task('build', ['clean-dist'], () =>
    gulp.src(['index.js', 'src/**/*.js', '!src/**/__tests__/*'])
        .pipe(babel())
        .pipe(gulp.dest('./dist')));

gulp.task('clean-dist', () => del(['dist']));
