var Promise = require('promise');

var appService = require('./../../services/app-service');

module.exports = {
	getAllApplications: function(req, res) {
		appService.applications.getAllEntities().then(function(entities) {
			res.json(entities);
		});
	},

	getApplicationById: function(req, res) {
		var id = req.swagger.params.id.value;

		appService.applications.getEntityById(id)
			.then(function(entity) {
				res.json(entity);
			}, function(error) {
				res.status(error.code).end();
			});
	},

	insertApplication: function(req, res) {
		var entity = req.swagger.params.entity.value;

		appService.applications.insertEntity(entity)
			.then(function(entity) {
				res.json(entity);
			}, function(error) {
				res.status(error.code).end();
			});
	},

	updateApplication: function(req, res) {
		var id = req.swagger.params.id.value;
		var entity = req.swagger.params.entity.value;

		appService.applications.updateEntity(id, entity)
			.then(function(entity) {
				res.json(entity);
			}, function(error) {
				res.status(error.code).end();
			});
	},

	deleteApplicationById: function(req, res) {
		var id = req.swagger.params.id.value;

		appService.applications.deleteEntityById(id)
			.then(function() {
				res.status(200).end();
			}, function(error) {
				res.status(error.code).end();
			});
	}
};