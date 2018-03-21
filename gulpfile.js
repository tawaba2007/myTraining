// var gulp = require('gulp');
// var browserSync =require('browser-sync');
//
// gulp.task('default', ['browser-sync']);
//
//
// gulp.task('browser-sync', function() {
//     browserSync({
//         server: {
//              baseDir: "./"       //対象ディレクトリ
//             ,index  : "index.html"      //インデックスファイル
//         }
//     });
// });
//
// //
// //ブラウザリロード
// //
// gulp.task('bs-reload', function () {
//     browserSync.reload();
// });
//
// //
// //監視ファイル
// //
// gulp.task('default', ['browser-sync'], function () {
//     gulp.watch("./*.html",            ['bs-reload']);
//     gulp.watch("./css/*.css", ['bs-reload']);
//     gulp.watch("./js/*.js",   ['bs-reload']);
// });

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var plumber = require('gulp-plumber');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./scss/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
