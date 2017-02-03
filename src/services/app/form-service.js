var _base = require('./_service');
var lokijs = require('./../data/lokijs');

var service = _base.generateAppService(lokijs.names.forms, lokijs);

var Promise = require('promise');
var fs = require('fs');
var path = require('path');

var formsRoot = path.join(__dirname, '..', '..', 'forms');
console.log(formsRoot);

function loadForms() {
	return new Promise(function(resolve, reject) {
		var root = formsRoot;

		fs.readdir(root, function(err, files){
			if (err) {
				reject(err);
				return;
			}

			var subFolders = files
				.filter(function(file) {
					return file.indexOf('.') == -1;
				})
				.map(function(folder) {
					return path.join(root, folder)
				});
			resolve(subFolders);
		});
	}).then(function(subFolders) {
		var promises = subFolders
			.map(function(subFolder) {
				return new Promise(function(resolve, reject){
					fs.readdir(subFolder, function(err, files) {
						if (err) {
							reject(err);
							return;
						}

						var formFiles = files.filter(function(file) {
							return file == 'form.json';
						});

						if (formFiles.length > 0) {
							resolve(subFolder);
						} else {
							resolve();
						}
					});
				});
			});
		return Promise.all(promises);
	}).then(function(formFolders) {
		var promises = formFolders
			.filter(function(formFolder) {
				return !!formFolder;
			})
			.map(function(formFolder) {
				return new Promise(function(resolve, reject) {
					var file = path.join(formFolder, 'form.json');
					fs.readFile(file, 'utf8', function(err, content) {
						if (err) {
							reject(err);
							return;
						}

						resolve(JSON.parse(content));
					});
				});
			});
		return Promise.all(promises);
	});
}

service.initialize = function() {
	return Promise.all([
		loadForms(),
		lokijs.initialize()
	]).then(function (responses) {
		var forms = responses[0];

		var promises = forms.map(function (form) {
			return service.insertEntity(form);
		});

		return Promise.all(promises);
	});
};

module.exports = service;