var Promise = require('promise');

var should = require('should');
var request = require('supertest');

var networkHelper = require('./../helpers/network-helper');

process.env.PORT = 20102;

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

	describe('form-controller', function() {

		describe('GET /forms', function() {
			it('should return an array of forms', function(done) {
				request(server)
					.get('/api/v1/forms')
					.set('Accept', 'application/json')
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(err, res) {
						should.not.exist(err);

						var data = res.body;

						data.should.be.instanceof(Array);
						data.should.have.lengthOf(1);

						done();
					});
			});
		});
	});

});
