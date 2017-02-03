var Promise = require('promise');
var loki = require('lokijs');

var db = new loki('database.json');

var service = {};

service.names = {
	applications: 'applications'
};

service.initialize = function() {
	db.addCollection(service.names.applications);
};

service.purge = function() {
	db.removeCollection(service.names.applications);
};

service.getAllEntities = function(tableName) {
	return new Promise(function(resolve, reject) {
		var table = db.getCollection(tableName);

		var entities = table.find({});

		resolve(entities);
	});
};

service.getEntityById = function(tableName, id) {
	return new Promise(function(resolve, reject) {
		var table = db.getCollection(tableName);

		var entity = table.findOne({ "id": id });

		resolve(entity);
	});
};

service.deleteEntityById = function(tableName, id) {
	return new Promise(function(resolve, reject) {
		var table = db.getCollection(tableName);

		var entity = table.findOne({ "id": id });

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

		var oldEntity = table.findOne({ "id": newEntity.id });

		oldEntity.title = newEntity.title;
		oldEntity.iconUrl = newEntity.iconUrl;
		oldEntity.webUrl = newEntity.webUrl;
		oldEntity.embedUrl = newEntity.embedUrl;
		oldEntity.embedContentUrl = newEntity.embedContentUrl;

		table.update(oldEntity);
		resolve(oldEntity);
	});
};

service.isIdExists = function(tableName, id) {
	return new Promise(function(resolve, reject) {
		var table = db.getCollection(tableName);

		var entity = table.findOne({ "id": id });

		resolve(entity != null);
	});
};

module.exports = service;