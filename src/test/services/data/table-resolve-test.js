var should = require('should');

var configService = require('./../../../services/config-service');

describe('services', function() {
	describe('data', function() {

		beforeEach(function() {
			var name = require.resolve('./../../../services/data-service');
			delete require.cache[name];
		});

		it('should return in-memory database for dev environment', function() {
			configService.environment = 'dev';

			var actualTables = require('./../../../services/data-service').tables;
			var expectedTables = require('./../../../services/data/lokijs');

			actualTables.should.be.deepEqual(expectedTables);
		});

		it('should return azure-table-storage database for prod environment', function() {
			configService.environment = 'prod';

			var actualTables = require('./../../../services/data-service').tables;
			var expectedTables = require('./../../../services/data/azure-table-storage');

			actualTables.should.be.deepEqual(expectedTables);
		});

		['', 'qa', 'test'].forEach(function(environment) {
			it('should throw error for other environments (like "' + environment + '")', function() {
				configService.environment = environment;

				(function() {
					require('./../../../services/data-service');
				}).should.throw();
			});
		});

	});
});