var EPDQ = require('../epdq'),
    should = require('should'),
    options = {amount: 1500, currency: 'EUR', language: 'en_US', orderid: '1234'};

describe("Request", function(){
  beforeEach(function(done){
    EPDQ.config.shaIn = "Mysecretsig1875!?";
    EPDQ.config.pspId = "MyPSPID";
    done();
  })
  it("should calculate sha1 shasign correctly", function(){
    EPDQ.config.shaType = 'sha1';
    var req = new EPDQ.Request(options);
    req.shaSign().should.equal("F4CC376CD7A834D997B91598FA747825A238BE0A");
  });

  it("should calculate sha256 shasign correctly", function(){
    EPDQ.config.shaType = 'sha256';
    var req = new EPDQ.Request(options);
    req.shaSign().should.equal("E019359BAA3456AE5A986B6AABD22CF1B3E09438739E97F17A7F61DF5A11B30F");
  });

  it("should calculate sha512 shasign correctly", function(){
    EPDQ.config.shaType = 'sha512';
    var req = new EPDQ.Request(options);
    req.shaSign().should.equal("D1CFE8833A297D0922E908B2B44934B09EE966EF1584DC0D696304E07BB58BA71973C2383C831D878D8A243BB7D7DFFFBE53CEE21955CDFEF44FE82E551F859D");
  });

  describe("formAttributes", function(){
    it("should return hash of form attributes with uppercase keys", function(){
      EPDQ.config.shaType = 'sha1';
      var req = new EPDQ.Request(options);
      attrs = req.formAttributes();

      attrs['AMOUNT'].should.equal('1500');
      attrs['CURRENCY'].should.equal('EUR');
      attrs['LANGUAGE'].should.equal('en_US');
      attrs['ORDERID'].should.equal('1234');
      attrs['PSPID'].should.equal('MyPSPID');
      attrs['SHASIGN'].should.equal('F4CC376CD7A834D997B91598FA747825A238BE0A');
    });
  });
  describe("requestUrl in test mode", function(){
    it("should return the test URL", function(){
      EPDQ.config.testMode = true;
      new EPDQ.Request(options).requestUrl().should.equal(EPDQ.Request.TEST_URL);
    });
  });

  describe("requestUrl in live mode", function(){
    it("should return the live URL", function(){
      EPDQ.config.testMode = false;
      new EPDQ.Request(options).requestUrl().should.equal(EPDQ.Request.LIVE_URL);
    });
  });

  describe("with a custom account", function(){
    it("should override the defaults", function(){
      EPDQ.config.accounts = {
        'test': {
          testMode: true,
          pspId: 'AnotherPSPID',
          shaIn: 'ininin',
          shaType: 'sha1'
        }
      };
      var req = new EPDQ.Request({account: 'test', amount: 1500, currency: 'EUR', language: 'en_US', orderid: '1234'});
      req.shaSign().should.equal("A724E81D5C7A3E915A671BB3220F2225000E11DC");
    });
  });
});
