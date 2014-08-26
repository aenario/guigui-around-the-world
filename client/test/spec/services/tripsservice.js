'use strict';

describe('Service: tripsService', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var tripsService;
  beforeEach(inject(function (_tripsService_) {
    tripsService = _tripsService_;
  }));

  it('should do something', function () {
    expect(!!tripsService).toBe(true);
  });

});
