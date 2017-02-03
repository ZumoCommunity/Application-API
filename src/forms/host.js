var mustache = require('mustache');

var formSerice = require('./../services/app-service').forms;

var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.get('/:form', function (req, res) {
	var form = req.params.form;

	var model = {};

	var html = mustache.render('template', model);

	res.send(form);
});

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