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
        url: 'http://localhost:3000/trips/'
      }).success(function (data) {
        data.forEach(function (tripData) {
          tmpArray.push(new Trip(tripData));
        });
      });
      return tmpArray;
    };

    Trip.prototype.save = function Tripsave(form) {
      self = this;
      return $http({
        method: 'PUT',
        url: 'http://localhost:3000/trips/' + this.id,
        data: new FormData(form)
      }).success(function (data) {
        angular.extend(self, data);
      });
    };

    Trip.prototype.remove = function Tripremove() {
      return $http({
        method: 'DELETE',
        url: 'http://localhost:3000/trips/' + this.id
      });
    };

    return Trip;

  });
