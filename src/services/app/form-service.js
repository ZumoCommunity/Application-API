var _base = require('./_service');
var lokijs = require('./../data/lokijs');

var service = _base.generateAppService(lokijs.names.forms, lokijs);

var Promise = require('promise');
var fs = require('fs');
var path = require('path');
var mustache = require('mustache');

var formsRoot = path.join(__dirname, '..', '..', 'forms');

function getFormPath(form) {
	return form.name.toLowerCase().replace(' ', '-');
}

service.render = function(formId, language, parameters) {
	return new Promise(function(resolve, reject) {
		service
			.getEntityById(formId)
			.then(function(form) {
				var templatePath = path.join(getFormPath(form), 'form.hjs');

				var promises = [];
				promises.push(loadFormLanguage(form, language));
				promises.push(service.loadTemplate(templatePath));

				return Promise.all(promises);
			})
			.then(function(responses) {
				var lang = responses[0];
				var template = responses[1];

				var model = {
					Lang: lang
				};

				var html = mustache.render(template, model);

				resolve(html);
			});
	});
};

function loadFormLanguage(form, lang) {
	return new Promise(function(resolve, reject) {
		var langFile = path.join(formsRoot, getFormPath(form), 'lang', lang + '.json');
		fs.readFile(langFile, 'utf8', function(err, content) {
			if (err) {
				reject(err);
				return;
			}

			resolve(JSON.parse(content));
		});
	});
}

service.loadTemplate = function(templatePath) {
	return new Promise(function(resolve, reject) {
		var fullPath = path.join(formsRoot, templatePath);
		fs.readFile(fullPath, 'utf8', function(err, content) {
			if (err) {
				reject(err);
				return;
			}
			resolve(content);
		});
	});
};

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
				var promises = [];

				promises.push(new Promise(function(resolve, reject) {
					var file = path.join(formFolder, 'form.json');
					fs.readFile(file, 'utf8', function(err, content) {
						if (err) {
							reject(err);
							return;
						}

						resolve(JSON.parse(content));
					});
				}));

				promises.push(new Promise(function(resolve, reject) {
					var langRoot = path.join(formFolder, 'lang');
					fs.readdir(langRoot, function(err, files) {
						if (err) {
							reject(err);
							return;
						}

						var languages = files.map(function(file) {
							return file.replace('.json', '');
						});

						resolve(languages);
					});
				}));

				return Promise.all(promises);
			});
		return Promise.all(promises);
	}).then(function(results) {
		var forms = results.map(function(result) {
			var form = result[0];
			form.languages = result[1];
			return form;
		});

		return Promise.resolve(forms);
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