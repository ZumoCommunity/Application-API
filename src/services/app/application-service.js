var _base = require('./_service');
var dataTables = require('./../data-service').tables;

var service = _base.generateAppService(dataTables.names.applications, dataTables);

module.exports = service;