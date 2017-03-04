var dataService = require('./data-service').tables;

var service = {};

service.checkHealth = function() {
	return dataService.checkHealth();
};

module.exports = service;