var config = require('./config-service');

var service = {};

switch (config.environment) {
	case 'dev':
		service.tables = require('./data/lokijs');
		break;
	case 'prod':
		service.tables = require('./data/azure-table-storage');
		break;
	default:
		throw new Error('Unsupported configuration value for "Environment"');
}

module.exports = service;