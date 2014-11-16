/*global describe, it, before, beforeEach, after, afterEach */
var should = require('should'),
  async = require('async');

describe('Document database', function () {
  var db = require('../models/database');
  var Trip = db.Model('trip');
  var Other = db.Model('other');

  // empty db
  before(function (done) {
    this.timeout(10000);
    require('../models/database').empty(done);
  });

  describe('put', function () {
    it('refuse docs without id', function (done) {

      var trip = {
        any: 'field'
      };

      Trip.put(trip, function (err, doc) {
        err.should.have.property('message', 'no id');
        should.not.exist(doc);
        done();
      });

    });

    it('creates doc with id', function (done) {

      var trip = {
        id: '3615282',
        any: 'field'
      };

      Trip.put(trip, function (err, doc) {
        should.not.exist(err);
        should.exist(doc);
        done();
      });

    });

    it('update doc with id', function (done) {

      var trip = {
        id: '3615282',
        any: 'field2'
      };

      Trip.put(trip, function (err, doc) {
        should.not.exist(err);
        should.exist(doc);
        doc.should.have.property('any', 'field2');
        done();
      });

    });

    it('doesnt break on parallel calls', function (done) {

      var trips = [{
        id: '36182',
        any: 'field'
      }, {
        id: '35282',
        any: 'field'
      }, {
        id: '36183',
        any: 'field'
      }];

      async.forEach(trips, function (trip, cb) {
        Trip.put(trip, function (err, doc) {
          should.not.exist(err);
          should.exist(doc);
          cb();
        });
      }, done);

    });

  });

  describe('list', function () {
    it('should get all docs of this type', function (done) {
      Trip.list(function (err, docs) {
        should.not.exist(err);
        docs.should.have.length(4);
        done();
      });
    });

    it('if i put doc of other type', function (done) {
      Other.put({
        id: '36182',
        it: 'is not a trip'
      }, done);

    });

    it('doesnt get picked by list ', function (done) {
      Trip.list(function (err, docs) {
        should.not.exist(err);
        docs.should.have.length(4);
        done();
      });
    });

  });

  describe('deletion', function () {
    it('works', function (done) {
      Trip.del({id: '36182'}, done);
    });

    it('works', function (done) {
      Trip.list(function (err, docs) {
        should.not.exist(err);
        docs.should.have.length(3);
        done();
      });
    });

  });

});