const {src, dest, watch, parallel} = require("gulp");
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const pug = require('gulp-pug');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const babel = require('gulp-babel');

const dist = './dist';
const srcPath = './src';
const path = {
    src: {
        js: srcPath + '/js/*.js',
        less: srcPath + '/less/*.less'
    },
    dest: {
        js: dist + '/js',
        less: dist + '/css'
    }
}

function browsersync() {
    browserSync.init({
        proxy: "https://localhost:443"
    })
}


function scripts() {
    return src(['src/js/index.js', 'src/js/painting.js', 'src/js/users.js', 'src/js/settings.js'])
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(dest(path.dest.js))
        .pipe(browserSync.stream())
}

function startwatch() {
    watch([path.src.js], scripts);
    watch([path.src.less], styles);

}


function styles() {
    return src(path.src.less)
        .pipe(less())
        .pipe(concat('index.min.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(cleancss( { level: { 1: { specialComments: 0 } }} ))
        .pipe(dest(path.dest.less))
        .pipe(browserSync.stream())
}


exports.default = parallel(scripts, styles, browsersync, startwatch);