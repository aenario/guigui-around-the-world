'use strict';

/**
 * @ngdoc service
 * @name clientApp.guid
 * @description
 * # guid
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('guid', function guid() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
                 .toString(16)
                 .substring(1);
    }
    return function() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
             s4() + '-' + s4() + s4() + s4();
    };
  });
