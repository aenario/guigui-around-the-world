  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('MainCtrl', function ($scope) {
      /** tilesDict
       * Set new tiles to create a new layer
       */
      var tilesDict = {
        openstreetmap: {
          url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          options: {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        }
      };

      /** Set icons for the map
       * From Font Awesome
       * See https://github.com/lvoogdt/Leaflet.awesome-markers
       */
      var icons = {
        mobyMarker: {
          type: 'awesomeMarker',
          prefix: 'fa',
          icon: 'thumbs-o-up',
          markerColor: 'darkblue'
        },
        challengeMarker: {
          type: 'awesomeMarker',
          prefix: 'fa',
          icon: 'paw',
          markerColor: 'orange'
        },
          stepMarker: {
          type: 'awesomeMarker',
          prefix: 'fa',
          icon: 'life-ring',
          markerColor: 'darkgreen'
        }
        
      };

      angular.extend($scope, {
        center: {
            lat: 40.095,
            lng: -3.823,
            zoom: 1
        },
        paths: {
          p1:{
            color: '#008000',
            weight: 8,
            latlngs: [
              { lat: 51.50, lng: -0.082 },
              { lat: 48.83, lng: 2.37 },
              { lat: 41.91, lng: 12.48 }
            ],
          } 
        },
        markers: {
          leccoMarker: {
            lat: 45.85,
            lng: 9.38,
            message: '<img class="challengePic" src="./images/yeoman.png" />Beginning of the lonely trip ... ',
            focus: false,
            draggable: false,
            icon: icons.mobyMarker
          },
          chileMarker: {
            lat: -33.2,
            lng: -71.36,
            focus: true,
            draggable: false,
            icon: icons.challengeMarker
          },
          newZealandMarker: {
            lat: -45.52,
            lng: 170.50,
            focus: true,
            draggable: false,
            icon: icons.stepMarker
          },
          london: {
            lat: 51.50,
            lng: -0.082,
            icon: icons.stepMarker
          },
          paris: {
            lat: 48.83,
            lng: 2.37,
            icon: icons.stepMarker
          },
          roma: {
            lat: 41.91,
            lng: 12.48,
            icon: icons.stepMarker
          }
        },
        tiles: tilesDict.openstreetmap,
        defaults: {
            scrollWheelZoom: false
        }
      });


    });
