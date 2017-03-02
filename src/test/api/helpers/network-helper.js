var Promise = require('promise');

var net = require('net');

var service = {};

service.waitPortInUse = function(port) {
	return new Promise(function(resolve, reject) {
		var tester = net.createServer();

		var interval = setInterval(function() {
			tester.once('error', function (error) {
				clearInterval(interval);
				if (error.code != 'EADDRINUSE') {
					reject(error);
				}
				resolve();
			});

			tester.once('listening', function() {
				tester.close();
			});

			tester.listen(port)
		}, 2000);
	});
};

module.exports = service;