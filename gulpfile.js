const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babelify');

const postcss = require('gulp-postcss');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');

const AUTOPREFIXER_BROWSERS = [
    'last 2 Chrome versions',
    'last 2 Firefox versions',
    'last 2 Opera versions',
    'Safari >= 8',
    'ie >= 10',
    'Edge >= 12',
    'last 2 ChromeAndroid versions',
    'last 2 FirefoxAndroid versions',
    'last 2 Android versions',
    'last 2 OperaMobile versions',
    'iOS >= 8',
    'ie_mob >= 10'
];

gulp.task('css', () => {
    const processors = [
        autoprefixer({'browsers': AUTOPREFIXER_BROWSERS}),
        postcssFlexbugsFixes
    ];

    return gulp.src('src/sass/main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(cssnano())
        .pipe(gulp.dest('./css'));
});

gulp.task('js', () => {
    let bundler = watchify(browserify('./src/js/index.js', { debug: true }).transform(babel));

    return bundler.bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', () => {
    gulp.watch('src/sass/**/*', ['css']);
    gulp.watch('src/js/**/*', ['js']);
});

gulp.task('default', ['watch', 'js', 'css']);