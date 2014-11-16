'use strict';

/**
 * @ngdoc service
 * @name clientApp.Auth
 * @description
 * # Auth
 * Service in the clientApp.
 */
angular.module('clientApp')
  .factory('Auth', function ($http, Base64, $location) {
    
    var store = {
      adminpass: null
    };
    
    function checkIsAdmin(){
      $http.get('/api/admin')
      .success(function(){
        alert('Yo guigui, what\'s up ?')
      })
      .error(function(){
        $location.path('/');
      });
    }
    
    function getAuthHeader(){
      Base64.encode('test:' + store.adminpass);
    }
    
    
    
    return {
      checkIsAdmin: checkIsAdmin,
      getAuthHeader: getAuthHeader
    };
  });
