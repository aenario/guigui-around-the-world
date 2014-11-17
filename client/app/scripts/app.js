'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */




var app = angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'leaflet-directive',
    'textAngular'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .when('/trips/create', {
        templateUrl: 'views/createtrip.html',
        controller: 'CreatetripCtrl'
      })
      .when('/trips/:tripId', {
        templateUrl: 'views/showtrip.html',
        controller: 'ShowtripCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


