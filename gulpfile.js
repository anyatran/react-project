const gulp = require('gulp');
const browserify = require('browserify');
const clean = require('gulp-clean');
const nodemon = require('gulp-nodemon');
const source = require('vinyl-source-stream');
gulp.task('server', () => {
  nodemon({
    script: 'app.js',
    ext: 'js html',
    ignore: ['**/*.*'],
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('clean', () => {
  return gulp.src([
    '/public/scripts',
  ]).pipe(clean());
});

gulp.task('build', () => {
  browserify({
    entries: './src/main.js',
    debug: true,
  })
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/scripts/'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.js', ['build']);
});

gulp.task('start', ['clean', 'build', 'server', 'watch']);
gulp.task('default', ['start']);
