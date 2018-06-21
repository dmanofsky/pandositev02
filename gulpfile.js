const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const server = require('gulp-express');

// Log Message
gulp.task('message', () =>
    console.log('Gulp is running...')
);

// Optimize images
gulp.task('imageMin', function() {
	gulp.src('src/assets/icons/*')
		.pipe(imagemin())
        .pipe(gulp.dest('dist/assets/icons'));
    gulp.src('src/assets/images/*')
		.pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'));
    gulp.src('src/assets/logos/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/assets/logos'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () =>
    gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream())
);

// Move the javascript files into our /dist/js folder
gulp.task('js', () =>
    gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream())
);

// Move the HTML files into our /dist folder
gulp.task('html', () =>
    gulp.src('src/*.html')
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream())
);

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./dist",
        port: 80
    })

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass'])
    gulp.watch("src/*.html").on('change', browserSync.reload)
});

gulp.task('default', ['html','js','serve']);