var crypto = require('crypto');

var ShaCalculator = function(parameters, sha, shaType){
  this.shasum = crypto.createHash(shaType);
  this.sha = sha;
  this.parameters = {};
  var val;
  for(var key in parameters){
    val = parameters[key];
    if (val != null && val.length){
      this.parameters[key.toUpperCase()] = val;
    }
  }
}
ShaCalculator.prototype.shaSignature = function(){
  if (this.sha == null || !this.sha.length){
    throw new Error("missing or empty sha parameter");
  }
  var buffer = '',
      sortedKeys = [];

  for(var key in this.parameters) { sortedKeys.push(key); }
  sortedKeys = sortedKeys.sort();

  var key,
      arrLen = sortedKeys.length;
  for(var idx = 0; idx < arrLen; idx++){
    key = sortedKeys[idx];
    buffer += key  + "=" + this.parameters[key] + this.sha;
  }

  this.shasum.update(buffer);
  return this.shasum.digest('hex').toUpperCase();
}

module.exports = ShaCalculator;
