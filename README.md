[![Build Status](https://travis-ci.org/alphagov/epdq_npm.png)](https://travis-ci.org/alphagov/epdq_npm)

# EPDQ

EPDQ is a node library for interfacing with Barclaycard's ePDQ payment gateway.

## Usage

First, configure the EPDQ module for your settings:

```
var EPDQ = require('epdq');

EPDQ.config.shaType = "sha1";
EPDQ.config.pspid  = "MyPSPID";
EPDQ.config.shaIn  = "Mysecretsig1875!?";
EPDQ.config.shaOut = "yourshaoutstring";
```

Then you can build the form for a user to POST to, starting in the controller: All the options keys are named after the downcased fields in the [ePDQ documentation](https://mdepayments.epdq.co.uk/ncol/ePDQ_e-Com-ADV_EN.pdf), provided as strings.

```
var request = new EPDQ.Request({amount: 1500, currency: 'EUR', language: 'en_US', orderid: '1234'});
```

You can then generate a signature for the request.

```
var signature = request.shaSign(); // => 'F4CC376CD7A834D997B91598FA747825A238BE0A'
```

and generate form parameters including the required ePDQ configuration values for your views.

```
request.formAttributes(); // => { 'AMOUNT' : '1500', 'CURRENCY' : 'EUR', 'LANGUAGE' : 'en_US', 'ORDERID' : '1234', 'PSPID' : 'MyPSPID', 'SHASIGN' : 'F4CC376CD7A834D997B91598FA747825A238BE0A' }
```

## Tests

```
$ npm test
```
or more explicitly
```
$ mocha -R spec test/*
```
