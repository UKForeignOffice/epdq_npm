var EPDQ = require('./../epdq'),
    ShaCalculator = require('./sha_calculator');


var Request = function(parameters){
  this.config = EPDQ.config;
  this.parameters = parameters;

  var account = parameters['account'];
  delete parameters['account'];
  this.account = EPDQ.config.accounts[account] || EPDQ.config;

  this.getFullParameters = function(){
    var fullParams = {};
    for(var key in this.parameters){
      fullParams[key] = this.parameters[key].toString();
    }
    fullParams['pspid'] = this.account.pspId;
    return fullParams;
  };
};

Request.TEST_URL = "https://mdepayments.epdq.co.uk/ncol/test/orderstandard.asp";
Request.LIVE_URL = "https://payments.epdq.co.uk/ncol/prod/orderstandard.asp";

Request.prototype.shaSign = function(){
  var shaCalculator = new ShaCalculator(this.getFullParameters(), this.account.shaIn, this.account.shaType);
  return shaCalculator.shaSignature();
};
 Request.prototype.formAttributes = function(){
  var val,
      formAttrs = {},
      fullAttrs = this.getFullParameters();

  for(var key in fullAttrs){
    val = fullAttrs[key];
    if(val.length){
      formAttrs[key.toUpperCase()] = val.toString();
    }
  }

  formAttrs["SHASIGN"] = this.shaSign();

  return formAttrs;
};
Request.prototype.requestUrl = function(){
  return this.config.testMode ? Request.TEST_URL : Request.LIVE_URL;
};

module.exports = Request;
