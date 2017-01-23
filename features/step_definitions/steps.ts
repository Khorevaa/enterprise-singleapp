var {defineSupportCode} = require('cucumber');

//const path = require('path');
//const exec = require('child_process').exec;

//const assert = require('assert');

//const fs = require('fs-promise');
//const mkdirp = require('mkdirp-promise')
//const rmfr = require('rmfr')
//const tempDir = path.resolve(__dirname + '/../../tmp');

defineSupportCode(function ({ Given, When, Then, Before }) {

    this.Given(/^Открыто главное окно приложения$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

    this.Given(/^существует закладка "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

});