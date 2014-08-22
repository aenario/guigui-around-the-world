'use strict';

describe('Service: guid', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var guid;
  beforeEach(inject(function (_guid_) {
    guid = _guid_;
  }));

  it('should do something', function () {
    expect(!!guid).toBe(true);
  });

});
