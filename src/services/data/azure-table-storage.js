var Promise = require('promise');

var service = {};

service.names = {
	applications: 'applications'
};

service.initialize = function() {
	return new Promise(function(resolve, reject) {
		throw 'Not implemented method';
	});
};

service.purge = function() {
	return new Promise(function(resolve, reject) {
		throw 'Not implemented method';
	});
};

service.getAllEntities = function(tableName) {
	return new Promise(function(resolve, reject) {
		throw 'Not implemented method';
	});
};

service.getEntityById = function(tableName, id) {
	return new Promise(function(resolve, reject) {
		throw 'Not implemented method';
	});
};

service.deleteEntityById = function(tableName, id) {
	return new Promise(function(resolve, reject) {
		throw 'Not implemented method';
	});
};

service.insertEntity = function(tableName, newEntity) {
	return new Promise(function(resolve, reject) {
		throw 'Not implemented method';
	});
};

service.updateEntity = function(tableName, newEntity) {
	return new Promise(function(resolve, reject) {
		throw 'Not implemented method';
	});
};

service.isIdExists = function(tableName, id) {
	return new Promise(function(resolve, reject) {
		throw 'Not implemented method';
	});
};

module.exports = service;