const gulp = require('gulp');
// const babel = require('gulp-babel');
const rev = require('gulp-rev');
const concat = require('gulp-concat');
const revReplace = require('gulp-rev-replace');
const clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src(['dist'], {allowEmpty: true})
        .pipe(clean({force: true}));
});

gulp.task('ts', function () {
    return gulp.src(['node_modules/esljs/dist/esl.js', 'src/**/*.js'])
        // .pipe(babel({
        //     presets: ['@babel/preset-env']
        // }))
        .pipe(concat('bundle.js'))
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist'));
});
gulp.task('pre-script', function () {
    
});
gulp.task('html', function () {
    const manifest = gulp.src("./dist/rev-manifest.json");
    return gulp.src('index.html')
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('clean', 'ts', 'html'));