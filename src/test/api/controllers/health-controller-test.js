var Promise = require('promise');

var should = require('should');
var request = require('supertest');

var networkHelper = require('./../helpers/network-helper');

process.env.PORT = 20103;

var server = require('./../../../app');

describe('controllers', function() {
	before(function (done) {
		this.timeout(25 * 1000);

		networkHelper
			.waitPortInUse(process.env.PORT)
			.then(function() {
				done();
			})
	});

	describe('health-controller', function() {

		describe('GET /health', function() {
			it('should return 200', function(done) {
				request(server)
					.get('/api/v1/health')
					.expect(200)
					.end(function(err, res) {
						should.not.exist(err);

						done();
					});
			});
		});
	});

});
