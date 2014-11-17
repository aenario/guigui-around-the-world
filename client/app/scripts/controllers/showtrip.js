'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ShowtripCtrl
 * @description
 * # ShowtripCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ShowtripCtrl', function ($scope, $routeParams, Trip) {
  	$scope.currentTrip = Trip.get($routeParams.id);
  	console.log("currentTrip " + $scope.currentTrip);

  });
