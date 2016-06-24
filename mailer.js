/*global require, module, applicationContext */
'use strict';
var apiKey  = applicationContext.configuration.apiKey;
var request = require('org/arangodb/request');
var util    = require('util');

var data = require('./exports').schema.validate(applicationContext.argv[0]);
if (data.error) {
  throw data.error;
}

var response = request.post('https://api.sparkpost.com/api/v1/transmissions', {
  body: data.value,
  json: true,
  headers: {
    'Authorization': apiKey,
    'accept': 'application/json',
    'accept-encoding': '',  // https://github.com/arangodb/arangodb/issues/1436
    'content-type': 'application/json'
  }
});

if (Math.floor(response.statusCode / 100) !== 2) {
  if (response.body) {
    throw new Error(util.format(
      'Server returned status %s - %s',
      response.status,
      JSON.stringify(response.body.errors)
    ));
  } else {
    throw new Error('Server sent an empty response with status ' + response.status);
  }
}

module.exports = response.body;
