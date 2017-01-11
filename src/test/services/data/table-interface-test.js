var should = require('should');

var methods = [
	'initialize',
	'getAllEntities',
	'getEntityById',
	'deleteEntityById',
	'insertEntity',
	'updateEntity',
	'isIdExists',
	'purge'
];

var implementations = [
	{ name: 'lokijs', instance: require('./../../../services/data/lokijs') },
	{ name: 'azure-table-storage', instance: require('./../../../services/data/azure-table-storage') }
];

describe('interface', function() {
	describe('data', function() {
		describe('table', function() {

			implementations.forEach(function(object) {
				var instance = object.instance;

				describe(object.name, function() {
					methods.forEach(function(methodName) {

						it('has method' + methodName, function() {
							instance.should.have.property(methodName);

							var method = instance[methodName];
							method.should.be.a.Function;
						});

					});
				});

			});

		});
	});
});
