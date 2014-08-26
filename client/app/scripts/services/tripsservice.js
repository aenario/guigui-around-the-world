'use strict';

/**
 * @ngdoc service
 * @name clientApp.tripsService
 * @description
 * # tripsService
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('tripsService', function tripsService($http) {

    var Trip = function Trip(attributes) {
      var key;
      for (key in attributes) {
        if (attributes.hasOwnProperty(key)) {
          this[key] = attributes[key];
        }
      }
    };

    // return an array that will be filled
    // with of all Trip instances
    Trip.list = function Triplist() {
      var tmpArray = [];
      $http({
        method: 'GET',
        url: '/trips/'
      }).success(function (data) {
        data.forEach(function (tripData) {
          tmpArray.push(new Trip(tripData));
        });
      });
      return tmpArray;
    };

    Trip.prototype.save = function Tripsave(form) {
      return $http({
        method: 'PUT',
        url: '/trips/' + this.id,
        data: new FormData(form)
      });
    };

    Trip.prototype.remove = function Tripremove() {
      return $http({
        method: 'DELETE',
        url: '/trips/' + this.id
      });
    };

    return Trip;

  });
