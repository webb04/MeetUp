/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'scripts'], function() {
	gulp.watch('src/sass/**/*.scss', ['styles']);
	// gulp.watch('src/js/**/*.js', ['lint']);
	gulp.watch('src/index.html', ['copy-html']);
	gulp.watch('./dist/index.html').on('change', browserSync.reload);
	gulp.watch('src/register.html', ['copy-html']);
	gulp.watch('./dist/register.html').on('change', browserSync.reload);

	browserSync.init({
		server: './dist'
	});
});

gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'scripts'
]);

gulp.task('scripts', function() {
	gulp.src('src/js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify().on('error', gutil.log))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function() {
	gulp.src('src/index.html')
		.pipe(gulp.dest('./dist'));
	gulp.src('src/register.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function() {
	gulp.src('src/img/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('styles', function() {
	gulp.src('src/sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('lint', function () {
	return gulp.src(['src/js/**/*.js'])
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failOnError last.
		.pipe(eslint.failOnError());
});

gulp.task('tests', function () {
	gulp.src('tests/spec/extraSpec.js')
		.pipe(jasmine({
			integration: true,
			vendor: 'src/js/**/*.js'
		}));
});
