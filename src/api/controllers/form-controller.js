var Promise = require('promise');

var appService = require('./../../services/app-service');

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

	}
};