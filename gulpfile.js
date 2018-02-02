const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const pump = require('pump');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const wbBuild = require('workbox-build');
const zopfli = require("gulp-zopfli");
const replace = require('gulp-replace');
const fs = require('fs');
const runSequence = require('run-sequence');
const cssBase64 = require('gulp-css-base64');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const revDel = require('rev-del');

const tmp = './tmp/'

const uglifyCompressOptions = {
  properties: true,
  dead_code: true,
  drop_debugger: true,
  unsafe: true,
  conditionals: true,
  loops: true,
  unused: true,
  toplevel: true,
  inline: true,
  // drop_console: true,
  passes: 2
}

const uglifyMangleOptions = {
  toplevel: true
}

const uglifyOutputOptions = {
  beautify: false
}

const criticalCssPattern = /<link rel="stylesheet" href="(.*critical.*)">/g
const replaceCssFileWithStyleElement = (s, filename) => {
  const realFilename = tmp + filename.replace('build/', '')
  const criticalStyles = fs.readFileSync(realFilename, 'utf8')
  const inlineStyles = '<style>' + criticalStyles + '</style>'

  return inlineStyles
}

gulp.task('html', () =>
  gulp.src('src/*.html')
    .pipe(replace(criticalCssPattern, replaceCssFileWithStyleElement))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest(tmp)));

gulp.task('css', () =>
  gulp.src('src/css/*.scss')
    .pipe(sass())
    // .pipe(cssBase64({
    //   baseDir: "app"
    // }))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(tmp))
);

gulp.task('js', function(cb){
  pump([
    gulp.src('src/js/*.js'),
    babel({presets: 'es2015'}),
    uglify({
      compress: uglifyCompressOptions,
      mangle: uglifyMangleOptions,
      output: uglifyOutputOptions
    }),
    rename({suffix: '.min'}),
    gulp.dest(tmp)
  ], cb)
});

gulp.task('images', () =>
	gulp.src('src/images/*')
		.pipe(imagemin([
      imagemin.svgo(),
      imageminJpegRecompress({
        method: 'smallfry'
      }),
      imageminPngquant()
    ]))
		.pipe(gulp.dest('app/images/'))
);

gulp.task('fonts', () =>
  gulp.src("src/fonts/*/*.*tf")
    .pipe(gulp.dest("app/fonts/"))
)

gulp.task('bundle-sw', () => 
  wbBuild.generateSW({
    globDirectory: './app/',
    swDest: './app/sw.js'
  })
  .then(() => console.log("Service Worker generated."))
  .catch(err => console.log("An error occured: ", err))
)

gulp.task('manifest', () => {
  gulp.src("src/manifest.json")
    .pipe(gulp.dest("app"))
})

gulp.task('revision', () => {
  return gulp.src(tmp + '**/*.{js,css}')
    .pipe(rev())
    .pipe(gulp.dest('./app/build/'))
    .pipe(rev.manifest())
    .pipe(revDel({dest: './app/build/'}))
    .pipe(gulp.dest('./app/'))
})

gulp.task('revreplace', ['revision'], () => {
  const manifest = gulp.src('./app/rev-manifest.json')

  return gulp.src(tmp + '**/*.html')
    .pipe(revReplace({manifest}))
    .pipe(gulp.dest('./app/'))
})

gulp.task('default', cb => {
  runSequence('css', ['js', 'html', 'images', 'fonts'], 'revreplace', 'manifest', 'bundle-sw', cb)
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.{js}', [ 'js', 'revreplace' ]);
  gulp.watch('src/**/*.{scss}', [ 'css', 'revreplace' ]);
  gulp.watch('src/**/*.{html}', [ 'html', 'revreplace' ]);
  gulp.watch('src/images/*', [ 'images' ]);
  gulp.watch('src/fonts/*/*.*tf', [ 'fonts' ]);
  gulp.watch('src/*', [ 'bundle-sw' ])
})