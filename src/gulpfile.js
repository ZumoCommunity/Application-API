var gulp = require('gulp');

var fs = require('fs');

var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var zip = require('gulp-zip');

var sourceFiles = ['api/**/*.js', 'services/**/*.js'];
var testFiles = ['test/**/*.js'];

gulp.doneCallback = function (err) {
	process.exit(err ? 1 : 0);
};

gulp.task('test', function() {
	return gulp.src(['test/**/*.js'])
		.pipe(mocha({reporter: 'mocha-junit-reporter'}));
});

gulp.task('pre-test-cover', function () {
	return gulp.src(sourceFiles)
		.pipe(istanbul())
		.pipe(istanbul.hookRequire());
});

gulp.task('test-cover', ['pre-test-cover'], function () {
	return gulp.src(testFiles)
		.pipe(mocha({reporter: 'mocha-junit-reporter'}))
		.pipe(istanbul.writeReports({
			dir: './../.coverage',
			reporters: ['html', 'cobertura']
		}));
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