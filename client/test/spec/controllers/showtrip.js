'use strict';

describe('Controller: ShowtripCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ShowtripCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowtripCtrl = $controller('ShowtripCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
