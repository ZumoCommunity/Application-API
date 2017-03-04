var gulp = require('gulp');

var fs = require('fs');

var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var zip = require('gulp-zip');
var inlineCss = require('gulp-inline-css');
var inlinesource = require('gulp-inline-source');

var sourceFiles = ['api/**/*.js', 'services/**/*.js'];
var testFiles = ['test/**/*.js'];

var coverageDir = './../.coverage';

gulp.doneCallback = function (err) {
	process.exit(err ? 1 : 0);
};

gulp.task('test', function() {
	return gulp.src(['test/**/*.js'])
		.pipe(mocha({
			reporter: 'spec'
		}));
});

gulp.task('test:ci', function() {
	return gulp.src(['test/**/*.js'])
		.pipe(mocha({
			reporter: 'mocha-junit-reporter'
		}));
});

gulp.task('pre-test-cover', function () {
	return gulp.src(sourceFiles)
		.pipe(istanbul())
		.pipe(istanbul.hookRequire());
});

gulp.task('test-cover', ['pre-test-cover'], function () {
	return gulp.src(testFiles)
		.pipe(mocha({
			reporter: 'mocha-junit-reporter'
		}))
		.pipe(istanbul.writeReports({
			dir: coverageDir,
			reporters: ['html', 'cobertura'],
			reportOpts: {
				html: {
					dir: coverageDir + '/html'
				}
			}
		}));
});

gulp.task('test-cover:ci', ['test-cover'], function () {
});

gulp.task('inline-css', function() {
	return gulp.src(coverageDir + '/html/**/*.html')
		.pipe(inlineCss({
			applyStyleTags: true,
			applyLinkTags: true,
			removeStyleTags: true,
			removeLinkTags: true,
			preserveMediaQueries: true
		}))
		// .pipe(inlinesource())
		.pipe(gulp.dest(coverageDir + '/html-inline'));
});

gulp.task('zip-prod', function() {
	var package = JSON.parse(fs.readFileSync('package.json'));

	var modulesToInclude = [];
	for(var module in package.dependencies) {
		modulesToInclude.push('/node_modules/' + module);
	}

	//TODO: fix modules to exclude behavior
	var modulesToExclude = [];
	for(var module in package.devDependencies) {
		modulesToExclude.push('!node_modules/' + module + '/**');
	}

	var filesToInclude = ['**/*.js', '**/package.json', '**/*.yaml'];
	var filesToExclude = ['!gulpfile.js', '!test/**'];
	var filesToZip = filesToInclude.concat(filesToExclude).concat(modulesToInclude).concat(modulesToExclude);

	return gulp.src(filesToZip)
		.pipe(zip('api.zip'))
		.pipe(gulp.dest('./../.dist'));
});