var nconf = require('nconf');

var service = {};

nconf
	.argv()
	.env()
	.defaults({
		'Environment' : 'dev',
		'StorageConnectionString': '',
		'MeetupApiEndpoint': ''
	});

service.environment = nconf.get('Environment').toLowerCase();

service.storageConnectionString = nconf.get('StorageConnectionString');
service.MeetupApiEndpoint = nconf.get('MeetupApiEndpoint');

module.exports = service;