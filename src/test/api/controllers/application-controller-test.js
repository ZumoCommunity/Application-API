var should = require('should');
var request = require('supertest');

var server = require('./../../../app');

describe('controllers', function() {
	var tables;

	beforeEach(function(){
		tables = require('./../../../services/data-service').tables;

		tables.purge();
		tables.initialize();

		tables.insertEntity(tables.names.applications, { id: "1", title: "dummy 1", iconUrl: 'http://contoso.com/logo.png' });
		tables.insertEntity(tables.names.applications, { id: "2", title: "dummy 2", iconUrl: 'http://contoso.com/logo.png' });
	});

	describe('application-controller', function() {

		describe('GET /applications', function() {
			it('should return an array of applications', function(done) {
				request(server)
					.get('/api/v1/applications')
					.set('Accept', 'application/json')
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(err, res) {
						should.not.exist(err);

						var data = res.body;

						data.should.be.instanceof(Array);
						data.should.have.lengthOf(2);

						done();
					});
			});
		});

		describe('GET /applications/{id}', function() {
			['1', '2'].forEach(function(id) {
				it('should return an application entity for id = ' + id, function(done) {
					request(server)
						.get('/api/v1/applications/' + id)
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							var data = res.body;

							data.should.be.instanceof(Object);

							data.should.have.property('id', id);
							data.should.have.property('title', 'dummy ' + id);

							done();
						});
				});
			});

			['101', '102'].forEach(function(id) {
				it('should return 404 for id = ' + id, function(done) {
					request(server)
						.get('/api/v1/applications/' + id)
						.set('Accept', 'application/json')
						.expect(404)
						.end(function(err, res) {
							should.not.exist(err);

							done();
						});
				});
			});
		});

		describe('DELETE /applications/{id}', function() {
			['1', '2'].forEach(function(id) {
				it('should delete an application entity by id = ' + id, function(done) {
					request(server)
						.delete('/api/v1/applications/' + id)
						.set('Accept', 'application/json')
						.expect(200)
						.end(function(err, res) {
							should.not.exist(err);

							request(server)
								.get('/api/v1/applications')
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

			['101', '102'].forEach(function(id) {
				it('should return 404 for id = ' + id, function(done) {
					request(server)
						.delete('/api/v1/applications/' + id)
						.set('Accept', 'application/json')
						.expect(404)
						.end(function(err, res) {
							should.not.exist(err);

							done();
						});
				});
			});
		});
	});

});
