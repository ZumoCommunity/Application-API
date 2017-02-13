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
	formSerice.getAllEntities()
		.then(function(forms) {
			var html = forms.map(function(form) {
				return '<a href="/' + form.id + '">' + form.name + '</a><br/>';
			}).join('');

			res.send(html);
		});
});

app.get('/:formId', function (req, res) {
	var formId = req.params.formId;

	renderForm(formId, 'en-US')
		.then(function(html) {
			res.send(html);
		})
});

app.post('/:formId', function (req, res) {
	var formId = req.params.formId;
	var langId = req.body.langId || 'en-US';

	var parameters = req.body;
	delete parameters.langId;

	var props = Object
		.keys(parameters)
		.map(function(x) {
			return { key: x, value: parameters[x] };
		});

	renderForm(formId, langId, props)
		.then(function(html) {
			res.send(html);
		})
});

function renderForm(formId, lang, parameters) {
	var promises = [];
	promises.push(formSerice.render(formId, lang, parameters));
	promises.push(formSerice.loadTemplate('base.hjs'));
	promises.push(formSerice.getEntityById(formId));

	return Promise.all(promises)
		.then(function (results) {
			var formHtml = results[0];
			var layout = results[1];
			var form = results[2];

			var props = parameters || form.parameters.map(function (x) { return { key: x }; });

			var model = {
				langId: lang,
				languages: form.languages.map(function(language) {
					return {
						selected: language == lang,
						language: language
					}
				}),
				parameters: props
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