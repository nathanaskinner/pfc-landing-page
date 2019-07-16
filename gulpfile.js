const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const nunjucksRender = require('gulp-nunjucks-render');
const browserSync = require('browser-sync').create();

var reload = require('browser-sync').reload();

function styles() {
    return gulp.src('app/scss/**/*.+(scss|sass)')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('app/js/**/*.js')
    .pipe(concat({ path: 'main.js'}))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.stream());
}

function fonts() {
    return gulp.src('app/assets/fonts/**/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('dist/assets/fonts/'));
}

function images() {
    return gulp.src('app/assets/images/**/*.{jpg,png,svg}')
    .pipe(gulp.dest('dist/assets/images/'));
}


function html() {
    return gulp.src('app/pages/**/*.+(html|nunjucks|njk)')
    .pipe(nunjucksRender({
        path: ['app/templates']
    }))
    .pipe(gulp.dest('dist'))
}

function serve(done) {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
    done();
}

function watch() {
    gulp.watch('app/scss/**/*.+(scss|sass|css)', styles);
    gulp.watch('app/js/*', scripts).on('change', browserSync.reload);
    gulp.watch('app/**/*.+(njk|nunjucks|html)', html).on('change', browserSync.reload);
    gulp.watch('app/assets/images/**/*.{jpg,png,svg}', images).on('change', browserSync.reload);
}

exports.styles = styles;
exports.html = html;
exports.scripts = scripts;
exports.serve = serve;
exports.watch = watch;

exports.default = gulp.series(styles, html, fonts, images, scripts, serve, watch);
