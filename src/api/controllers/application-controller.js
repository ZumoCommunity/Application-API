require('promise');

var appService = require('./../../services/app-service');

module.exports = {
	getAllApplications: function(req, res) {
		appService.applications.getAllApplications().then(function(entities) {
			res.json(entities);
		});
	},

	getApplicationById: function(req, res) {
		var id = req.swagger.params.id.value;

		appService.applications.getApplicationById(id)
			.then(function(entity) {
				res.json(entity);
			}, function(error) {
				res.status(error.code).end();
			});
	},

	insertApplication: function(req, res) {
		var entity = req.swagger.params.entity.value;

		appService.applications.insertApplication(entity)
			.then(function(entity) {
				res.json(entity);
			}, function(error) {
				res.status(error.code).end();
			});
	},

	updateApplication: function(req, res) {
		var id = req.swagger.params.id.value;
		var entity = req.swagger.params.entity.value;

		appService.applications.updateApplication(id, entity)
			.then(function(entity) {
				res.json(entity);
			}, function(error) {
				res.status(error.code).end();
			});
	},

	deleteApplicationById: function(req, res) {
		var id = req.swagger.params.id.value;

		appService.applications.deleteApplicationById(id)
			.then(function() {
				res.status(200).end();
			}, function(error) {
				res.status(error.code).end();
			});
	}
};