var should = require('should');

var configService = require('./../../services/config-service');

describe('services', function() {
	describe('config-service', function() {

		it('dev environment by default', function() {
			var environment = configService.environment;

			environment.should.be.equal('dev');
		});

		it('no connection string for storage by default', function() {
			var storageConnectionString = configService.storageConnectionString;

			storageConnectionString.should.be.equal('');
		});

	});
});