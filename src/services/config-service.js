var nconf = require('nconf');

var service = {};

nconf
	.argv()
	.env()
	.defaults({
		'Environment' : 'dev',
		'StorageConnectionString': ''
	});

service.environment = nconf.get('Environment').toLowerCase();

service.storageConnectionString = nconf.get('StorageConnectionString');

module.exports = service;