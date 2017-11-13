const gulp = require('gulp');

gulp.task('default', [
  'assets',
]);

gulp.task('assets', () => {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('artifacts/assets/'));
});
