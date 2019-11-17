const gulp = require('gulp');
// const babel = require('gulp-babel');
const rev = require('gulp-rev');
const concat = require('gulp-concat');
const revReplace = require('gulp-rev-replace');
const clean = require('gulp-clean');
const inlineSanTemplate = require('gulp-parser-inline').parseSan;
const amdWrap = require('gulp-amd-wrap').amdWrap;
const gulpIf = require('gulp-if');
const babel = require('gulp-babel');
const inlinesource = require('gulp-inline-source');

function isSan(file) {
    return /.san.[jt]s$/.test(file.path);
}

gulp.task('clean', function () {
    return gulp.src(['dist'], {allowEmpty: true})
        .pipe(clean({force: true}));
});
gulp.task('template', function () {
    return gulp.src([
        'src/**/*.html',
        '!index.html'
    ]).pipe(gulp.dest)
});
gulp.task('js', function () {
    return gulp.src([
            'node_modules/esljs/dist/esl.js',
            'node_modules/san/dist/san.js',
            'src/**/*.js',
            'src/**/*.ts'
        ])
        .pipe(gulpIf(isSan, inlineSanTemplate({})))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(amdWrap({
            exclude: ['node_modules/**']
        }))
        .pipe(concat('bundle.js'))
        .pipe(rev())
        .pipe(gulp.dest('dist/static'))
        .pipe(rev.manifest('dist/rev-manifest.json', {
            base: process.cwd()+'/dist',
            merge: true,
            transformer: {
                parse: JSON.parse,
                stringify(obj) {
                    let res = {};
                    for (key in obj) {
                        let item = obj[key];
                        item = item.replace(/.js$/, '');
                        res[key] = item;
                    }
                    return JSON.stringify(res);
                }
            }
        }))
        .pipe(gulp.dest('dist'));
});
gulp.task('css', function () {
    return gulp.src('src/**/*.css')
        .pipe(concat('bundle.css'))
        .pipe(rev())
        .pipe(gulp.dest('dist/static'))
        .pipe(rev.manifest('dist/rev-manifest.json', {
            base: process.cwd()+'/dist',
            merge: true
        }))
        .pipe(gulp.dest('dist'));
});
gulp.task('pre-script', function () {
    return gulp.src('node_modules/esljs/dist/esl.js')
        .pipe(concat('pre-script.js'))
        .pipe(rev())
        .pipe(gulp.dest('dist/static'))
        .pipe(rev.manifest('dist/rev-manifest.json', {
            base: process.cwd()+'/dist',
            merge: true
        }))
        .pipe(gulp.dest('dist'));
});
gulp.task('html', function () {
    const manifest = gulp.src("./dist/rev-manifest.json");
    return gulp.src('index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(inlinesource())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('clean', gulp.parallel('js', 'css'), 'pre-script', 'html'));