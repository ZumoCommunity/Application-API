'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

var SwaggerUi = require('swagger-tools/middleware/swagger-ui');

module.exports = app;

var swaggerExpressConfig = {
	appRoot: __dirname
};

var swaggerUiOptions = {
	swaggerUi: '/'
};

SwaggerExpress.create(swaggerExpressConfig, function(err, swaggerExpress) {
	if (err) {
		throw err;
	}

	// Add swagger-ui (This must be before swaggerExpress.register)
	app.use(SwaggerUi(swaggerExpress.runner.swagger, swaggerUiOptions));

	swaggerExpress.register(app);

	var port = process.env.PORT || 10010;
	app.listen(port);
});
