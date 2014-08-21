'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CreatetripCtrl
 * @description
 * # CreatetripCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CreatetripCtrl', function ($scope) {

    $scope.formTrip = {};
    $scope.saveTrip = function(){
      console.log($scope.formTrip);
    };
  });
