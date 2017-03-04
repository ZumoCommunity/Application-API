var healthService = require('./../../services/health-service');

module.exports = {
	checkHealth: function(req, res) {
		try {
			healthService
				.checkHealth()
				.then(function() {
					res.status(200).end();
				}, function() {
					res.status(500).end();
				})
				.catch(function () {
					res.status(500).end();
				});
		}
		catch (e) {
			res.status(500).end();
		}
	}
};