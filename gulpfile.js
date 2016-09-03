const gulp   = require('gulp')
const sass   = require('gulp-sass')
const prefix = require('gulp-autoprefixer')
const sync   = require('browser-sync').create()


const paths = {
  sass: ['./src/sass/**/*.scss'],
  html: ['./src/html/**/*.html'],
  images: ['./src/images/**/*.*']
}


gulp.task('css', () => {
  gulp.src(paths.sass)
   .pipe(sass().on('error', sass.logError))
   .pipe(prefix())
   .pipe(gulp.dest('./docs/'))
   .pipe(sync.stream())
})


gulp.task('html', () => {
  gulp.src(paths.html)
    .pipe(gulp.dest('./docs/'))
    .pipe(sync.stream())
})

gulp.task('images', () => {
  gulp.src(paths.images)
    .pipe(gulp.dest('./docs/'))
    .pipe(sync.stream())
})

gulp.task('sync', () => {
  sync.init({
    server: { baseDir: './docs' }
  })
  gulp.watch(paths.sass,['css']).on('change', sync.reload)
  gulp.watch(paths.html,['html']).on('change', sync.reload)
})

gulp.task('default', ['sync', 'css', 'html', 'images'])
