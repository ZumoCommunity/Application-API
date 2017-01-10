require('promise');

var service = {};

service.names = {
	applications: 'applications'
};

service.initialize = function() {
};

service.getAllEntities = function(tableName) {
};

service.getEntityById = function(tableName, id) {
};

service.deleteEntityById = function(tableName, id) {
};

service.insertEntity = function(tableName, newEntity) {
};

service.updateEntity = function(tableName, newEntity) {
};

service.isIdExists = function(tableName, id) {
};

module.exports = service;