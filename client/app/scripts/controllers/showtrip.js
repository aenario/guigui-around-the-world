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
  	$scope.currentTrip = Trip.currentTrip($routeParams.tripId);
  	console.log("currentTrip ", $scope.currentTrip);

  	$scope.defaults = {
  	  tileLayer: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
  	  maxZoom : 14
  	};

  	var stepIcon = {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'life-ring',
      markerColor: 'darkgreen'
    };

  	$scope.paths = {
  		p:{
  			color: '#008000',
  			weight: 8,
  			message: $scope.currentTrip.title,
  			latlngs: [
  				{lat : parseFloat($scope.currentTrip.pointStartLat), lng : parseFloat($scope.currentTrip.pointStartLng)},
  				{lat : parseFloat($scope.currentTrip.pointEndLat), lng : parseFloat($scope.currentTrip.pointEndLng)},
  			]
  		}
  	};

  	$scope.markers = [
  	{
  	  lat : parseFloat($scope.currentTrip.pointStartLat),
  	  lng : parseFloat($scope.currentTrip.pointStartLng),
  	  message : $scope.currentTrip.pointStart,
  	  icon: stepIcon
  	},
  	{
  	  lat : parseFloat($scope.currentTrip.pointEndLat),
  	  lng : parseFloat($scope.currentTrip.pointEndLng),
  	  message : $scope.currentTrip.pointEnd,
  	  icon: stepIcon
  	}];


  });
