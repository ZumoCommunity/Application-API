var Promise = require('promise');
var loki = require('lokijs');

var db = new loki('database.json');

var service = {};

service.names = {
	applications: 'applications',
	forms: 'forms'
};

function removeMetadataProperties(entity) {
	delete entity['meta'];
	delete entity['$loki'];
	return entity;
}

service.initialize = function() {
	db.addCollection(service.names.applications);
	db.addCollection(service.names.forms);

	return Promise.resolve();
};

service.purge = function() {
	db.removeCollection(service.names.applications);

	return Promise.resolve();
};

service.getAllEntities = function(tableName) {
	return new Promise(function(resolve, reject) {
		var table = db.getCollection(tableName);

		var entities = table
			.find({})
			.map(removeMetadataProperties);

		resolve(entities);
	});
};

service.getEntityById = function(tableName, id) {
	return new Promise(function(resolve, reject) {
		var table = db.getCollection(tableName);

		var entity = table.findOne({ 'id': id });

		if (!!entity) {
			entity = removeMetadataProperties(entity);
			resolve(entity);
		} else {
			resolve();
		}
	});
};

service.deleteEntityById = function(tableName, id) {
	return new Promise(function(resolve, reject) {
		var table = db.getCollection(tableName);

		var entity = table.findOne({ 'id': id });

		table.remove(entity);
		resolve();
	});
};

service.insertEntity = function(tableName, newEntity) {
	return new Promise(function(resolve, reject) {
		var table = db.getCollection(tableName);

		table.insert(newEntity);

		resolve(newEntity);
	});
};

service.updateEntity = function(tableName, newEntity) {
	return new Promise(function(resolve, reject) {
		var table = db.getCollection(tableName);

		var oldEntity = table.findOne({ 'id': newEntity.id });

		Object
			.keys(newEntity)
			.filter(function (key) {
				return key != 'id';
			})
			.forEach(function (key) {
				oldEntity[key] = newEntity[key];
			});

		table.update(oldEntity);
		resolve(oldEntity);
	});
};

service.isIdExists = function(tableName, id) {
	return new Promise(function(resolve, reject) {
		var table = db.getCollection(tableName);

		var entity = table.findOne({ 'id': id });

		resolve(entity != null);
	});
};

service.checkHealth = function() {
	return new Promise(function (resolve, reject) {
		var keys = Object.keys(service.names);
		for (var i = 0; i < keys.length; i++) {
			var tableName = service.names[keys[i]];
			if (db.getCollection(tableName) == null) {
				reject();
				return;
			}
		}
		resolve();
	});
};

module.exports = service;