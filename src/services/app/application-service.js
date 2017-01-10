require('promise');

var dataTables = require('./../data-service').tables;

var service = {};

service.getAllApplications = function() {
	return dataTables.getAllEntities(dataTables.names.applications);
};

service.insertApplication = function(entity) {
	return dataTables
		.isIdExists(dataTables.names.applications, entity.id)
		.then(function(isExists) {
			if (isExists) {
				return Promise.reject({ code: 409 });
			} else {
				return dataTables.insertEntity(dataTables.names.applications, entity);
			}
		});
};

service.updateApplication = function(id, entity) {
	return dataTables
		.isIdExists(dataTables.names.applications, id)
		.then(function(isExists) {
			if (isExists) {
				return dataTables.updateEntity(dataTables.names.applications, entity);
			} else {
				return Promise.reject({ code: 404 });
			}
		});
};

service.deleteApplicationById = function(id) {
	return dataTables
		.isIdExists(dataTables.names.applications, id)
		.then(function(isExists) {
			if (isExists) {
				return dataTables.deleteEntityById(dataTables.names.applications, id);
			} else {
				return Promise.reject({ code: 404 });
			}
		});
};

service.getApplicationById = function(id) {
	return dataTables
		.getEntityById(dataTables.names.applications, id)
		.then(function(entity) {
			if (entity) {
				return Promise.resolve(entity);
			} else {
				return Promise.reject({ code: 404 });
			}
		});
};

module.exports = service;