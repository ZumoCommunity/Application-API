var Promise = require('promise');

function generateAppService(tableName, tables) {
	var dataTables = tables || require('./../data-service').tables;

	var service = {
		tableName: tableName
	};

	service.getAllEntities = function() {
		return dataTables.getAllEntities(service.tableName);
	};

	service.insertEntity = function(entity) {
		return dataTables
			.isIdExists(service.tableName, entity.id)
			.then(function(isExists) {
				if (isExists) {
					return Promise.reject({ code: 409 });
				} else {
					return dataTables.insertEntity(service.tableName, entity);
				}
			});
	};

	service.updateEntity = function(id, entity) {
		return dataTables
			.isIdExists(service.tableName, id)
			.then(function(isExists) {
				if (isExists) {
					return dataTables.updateEntity(service.tableName, entity);
				} else {
					return Promise.reject({ code: 404 });
				}
			});
	};

	service.deleteEntityById = function(id) {
		return dataTables
			.isIdExists(service.tableName, id)
			.then(function(isExists) {
				if (isExists) {
					return dataTables.deleteEntityById(service.tableName, id);
				} else {
					return Promise.reject({ code: 404 });
				}
			});
	};

	service.getEntityById = function(id) {
		return dataTables
			.getEntityById(service.tableName, id)
			.then(function(entity) {
				if (entity) {
					return Promise.resolve(entity);
				} else {
					return Promise.reject({ code: 404 });
				}
			});
	};

	return service;
}

module.exports = {
	generateAppService : generateAppService
};