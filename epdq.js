// Shared ePDQ configuration
exports.config = {
  testMode : false,
  shaType : 'sha1',
  shaIn : null,
  shaOut : null,
  pspId : null,
  accounts: {}
};
exports.Request = require('./epdq/request');
exports.Response = require('./epdq/response');
