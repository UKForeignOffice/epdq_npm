var EPDQ = require('./../epdq'),
    qs = require('qs'),
    ShaCalculator = require('./sha_calculator');


var calculatedShaOut = function(params, account){
  return new ShaCalculator(params, account.shaOut, account.shaType).shaSignature();
};

var Response = function(queryString, account, additionalParamKeys){
  var rawParameters = qs.parse(queryString);

  additionalParamKeys = additionalParamKeys || [];

  this.account = EPDQ.config.accounts[account] || EPDQ.config;
  this.rawParameters = {};
  this.additionalParameters = {};
  this.shasign = rawParameters['SHASIGN'];

  delete rawParameters['SHASIGN'];

  for (var key in rawParameters){
    if (additionalParamKeys.indexOf(key) > -1){
      this.additionalParameters[key] = rawParameters[key];
      delete rawParameters[key];
    } else {
      this.rawParameters[key] = rawParameters[key];
    }
  }
};
Response.prototype.isValidShasign = function(){
  if (this.shasign == null || !this.shasign.length) {
    throw new Error("missing or empty SHASIGN parameter");
  }
  return calculatedShaOut(this.rawParameters, this.account) == this.shasign;
};
Response.prototype.parameters = function(){
  var parameters = {};
  for (var key in this.rawParameters){
    parameters[key.toLowerCase()] = this.rawParameters[key];
  }
  for (var key in this.additionalParameters){
    parameters[key.toLowerCase()] = this.additionalParameters[key];
  }
  return parameters;
};

module.exports = Response;
