var gulp = require("gulp"),
    nodemon = require('gulp-nodemon'),
    livereloadscript = require('livereload'),
    sass = require('gulp-sass');

var server = livereloadscript.createServer();
server.watch([__dirname + "/public", __dirname + "/modules/client"]);

gulp.task("default", ['server', 'sass:watch']);


    

gulp.task('server', function () {
    var mon = nodemon({
        script: 'server.js'
    });
});

gulp.task('sass', function () {
    gulp.src('public/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css'));
})


gulp.task('sass:watch', function () {
    gulp.watch('public/sass/*.scss', ['sass']);
});




// var gulp = require("gulp"),
//     nodemon = require('gulp-nodemon'),
//     livereload = require('gulp-livereload'),
//     livereloadscript = require('livereload'),
//     sass = require('gulp-sass');

// var server = livereloadscript.createServer();
// server.watch([__dirname + "/public", __dirname + "/modules/client"]);

// gulp.task("default", ['server', 'sass:watch']);


    

// gulp.task('server', function () {
//     var mon = nodemon({
//         script: 'server.js'
//     });
// });

// gulp.task('sass', function () {
//     gulp.src('public/sass/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('public/css'));
// })

// gulp.task('sass:watch', function () {
//     gulp.watch('public/sass/*.scss', ['sass']);
// });




