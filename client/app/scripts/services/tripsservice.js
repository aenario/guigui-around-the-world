'use strict';

/**
 * @ngdoc service
 * @name clientApp.tripsService
 * @description
 * # tripsService
 * Service in the clientApp.
 */
angular.module('clientApp')
  .factory('Trip', function tripsService($http, Auth) {

    var Trip = function Trip(attributes) {
      var key;
      for (key in attributes) {
        if (attributes.hasOwnProperty(key)) {
          this[key] = attributes[key];
        }
      }
    };
    
    Trip.adminpass = null
    
    var list = [];

    // return an array that will be filled
    // with of all Trip instances
    Trip.list = function Triplist() {
      $http({
        method: 'GET',
        url: 'http://localhost:9000/api/trips/'
      }).success(function (data) {
        while (list.length) {
          list.pop()
        }
        data.forEach(function (tripData) {
          list.push(new Trip(tripData));
        });
      });
      return list;
    };

    // return an array that will be filled
    // with of all Trip instances
    Trip.get = function Triplist(id) {
      $http({
        method: 'GET',
        url: 'http://localhost:9000/api/admin/trips/' + id
      }).success(function (data) {
        console.log("data is " + data)
        return data;
      });
    };

    Trip.prototype.save = function Tripsave(files) {
      var self = this;
      var formdata = new FormData();
        for(var key in self) if (self.hasOwnProperty(key))
          formdata.append(key, self[key]);

        for(var i = 0, l= files.length; i<l; i++)
          formdata.append(files[i].name, files[i]);

      return $http({
        method: 'POST',
        url: 'http://localhost:9000/api/admin/trips/',
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity,
        data: formdata
      }).success(function (data) {
        angular.extend(self, data);
        if (-1 == list.indexOf(self)){
          list.push(self)
        }
      });
    };

    Trip.prototype.remove = function Tripremove() {
      var self = this;
      return $http({
        method: 'DELETE',
        url: 'http://localhost:9000/api/admin/trips/' + this.id
      }).success(function(){
        var index = list.indexOf(self);
        if (index > -1) {
          list.splice(index, 1);
        }
      })
    };

    return Trip;

  });
