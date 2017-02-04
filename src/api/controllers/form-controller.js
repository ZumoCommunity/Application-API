var Promise = require('promise');
var minify = require('html-minifier').minify;

var appService = require('./../../services/app-service');

function getMinifiedHtml(html){
	return minify(html, {
		removeComments: true,
		collapseWhitespace: true,
		minifyJS: true,
		minifyCSS: true,
		minifyURLs: true
	});
}

module.exports = {
	getAllForms: function(req, res) {
		appService.forms.getAllEntities().then(function(entities) {
			res.json(entities);
		});
	},

	getFormById: function(req, res) {
		var id = req.swagger.params.id.value;

		appService.forms.getEntityById(id)
			.then(function(entity) {
				res.json(entity);
			}, function(error) {
				res.status(error.code).end();
			});
	},

	renderForm: function(req, res) {
		var id = req.swagger.params.id.value;
		var lang = req.swagger.params.lang.value;

		appService.forms.render(id, lang, {})
			.then(function(html) {
				html = getMinifiedHtml(html);
				res.send(html);
			}, function(error) {
				res.status(500).end();
			});
	}
};