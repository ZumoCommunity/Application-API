var formSerice = require('./../services/app-service').forms;

var Promise = require('promise');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mustache = require('mustache');

var app = express();

app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.get('/:formId', function (req, res) {
	var formId = req.params.formId;

	renderForm(formId, 'en-US', {})
		.then(function(html) {
			res.send(html);
		})
});

app.post('/:formId', function (req, res) {
	var formId = req.params.formId;
	var langId = req.body.langId || 'en-US';

	renderForm(formId, langId, {})
		.then(function(html) {
			res.send(html);
		})
});

function renderForm(formId, lang, properties) {
	var promises = [];
	promises.push(formSerice.render(formId, lang));
	promises.push(formSerice.loadTemplate('base.hjs'));
	promises.push(formSerice.getEntityById(formId));

	return Promise.all(promises)
		.then(function (results) {
			var formHtml = results[0];
			var layout = results[1];
			var form = results[2];

			var model = {
				langId: lang,
				languages: form.languages.map(function(language) {
					return {
						selected: language == lang,
						language: language
					}
				})
			};

			var html = mustache.render(layout, model, { content: formHtml });

			return Promise.resolve(html);
		});
}

app.listen(4000, function () {
	console.log('Forms host app listening on port 4000!');
	console.log('Forms:');
	formSerice
		.initialize()
		.then(function(){
			formSerice.getAllEntities().then(function(forms) {
				forms.forEach(function(form){
					console.log('* ' + form.name);
				})
			});
		});
});