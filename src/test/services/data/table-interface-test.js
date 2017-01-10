var expect = require('expect.js');

var methods = [
	'initialize',
	'getAllEntities',
	'getEntityById',
	'deleteEntityById',
	'insertEntity',
	'updateEntity',
	'isIdExists'
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

						it(methodName, function() {
							expect(instance).to.have.property(methodName);

							var method = instance[methodName];
							expect(method).to.be.a('function');
						});

					});
				});

			});

		});
	});
});
