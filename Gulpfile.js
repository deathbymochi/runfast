var gulp = require('gulp'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream');

gulp.task('compile', function() {
  gulp.src('./src/*.jsx')
      .pipe(jsx())
      .pipe(gulp.dest('build'));
});

var pipeOutBundle = function(b) {
  b.bundle()
   .pipe(source('index.js'))
   .pipe(gulp.dest('build'));
};

var browserifyWatch = function() {
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  b = watchify(b).transform(reactify)
                 .add('./src/index.jsx');
  b.on('update', function() {
    pipeOutBundle(b);
  })
}

gulp.task('watch', function() {
  browserifyWatch();
})

gulp.task('browserify', function() {
  return browserify().transform(reactify)
            .add('./src/index.jsx')
            .bundle()
            .pipe(source('index.js'))
            .pipe(gulp.dest('build'))
});

gulp.task('default', ['browserify', 'watch']);
