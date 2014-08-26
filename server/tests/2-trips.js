/*global describe, it, before, beforeEach, after, afterEach */

var request = require('request'),
  should = require('should'),
  fs = require('fs'),
  config = require('../config.json');

describe('Trips API', function () {

  // start server
  before(function (done) {
    this.app = require('../index');
    this.server = this.app.listen(8888, done);
  });

  // empty db
  before(function (done) {
    require('../models/database').empty(done);
  });

  // create some fixtures
  before(function (done) {
    require('../models/database').batch([
      { type: 'put', key: 'trip_123', value: {id: '123', any: 'field'} },
      { type: 'put', key: 'trip_1234', value: {id: '1234', any: 'field'} },
      { type: 'put', key: 'trip_12345', value: {id: '12345', any: 'field'} },
      { type: 'put', key: 'driver_123', value: {id: '123', any: 'field'} }
    ], done);
  });

  describe('GET /trips', function () {
    it('respond with list of trips', function (done) {
      request({
        url: 'http://localhost:8888/trips',
        json: true
      }, function (err, res, body) {
        should.not.exist(err);
        res.statusCode.should.equal(200);
        body.length.should.equal(3);
        done();
      });
    });
  });
  describe('POST /trips', function () {

    it('need auth', function (done) {

      var formData = {
        some: 'fields'
      };

      request({
        method: 'POST',
        url: 'http://localhost:8888/admin/trips',
        formData: formData
      }, function (err, res, body) {
        should.not.exist(err);
        res.statusCode.should.equal(401);
        done();
      });
    });

    it('create doc', function (done) {
      var context = this;
      var req = request({
        method: 'POST',
        auth: {
          user: config.adminuser,
          pass: config.adminpass
        },
        url: 'http://localhost:8888/admin/trips',
        form: true
      }, function (err, res, body) {
        should.not.exist(err);
        res.statusCode.should.equal(200);
        body = JSON.parse(body);
        body.should.have.property('id');
        context.id = body.id;
        body.should.have.property('attachments');
        body.should.have.property('some', 'fields');
        body.should.not.have.property('attachment1.json');
        done();
      });

      var form = req.form();
      form.append('some', 'fields');
      form.append('what', 'ever');
      form.append("attachment1.json", fs.createReadStream('./package.json'));
      form.append("attachment2.js", fs.createReadStream('./index.js'));

    });

  });

  describe('GET /trips/id/attachment', function () {

    it('works', function (done) {
      var url = 'http://localhost:8888/trips/' + this.id + '/index.js';
      request(url, function (err, res, body) {
        should.not.exist(err);
        res.statusCode.should.equal(200);
        done();
      });
    });

  });

  describe('DELETE /admin/trips/:id', function () {
    it('works', function (done) {
      request({
        method: 'DELETE',
        auth: {
          user: config.adminuser,
          pass: config.adminpass
        },
        url: 'http://localhost:8888/admin/trips/' + this.id,
        form: true
      }, function (err, res, body) {
        should.not.exist(err);
        res.statusCode.should.equal(204);
        done();
      });
    });
  });

});