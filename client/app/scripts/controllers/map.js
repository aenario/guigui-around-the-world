  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:MapCtrl
   * @description
   * # MapCtrl
   * Controller of the clientApp
   */
app.controller('MapCtrl', function ($scope, Trip) {
  /** tilesDict
   * Set new tiles to create a new layer
   */
  var tilesDict = {
    thunderforestLandscape: {
      url: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
      options: {
        attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      }
    }
  };

  /** Set icons for the map
   * From Font Awesome
   * See https://github.com/lvoogdt/Leaflet.awesome-markers
   */
  var icons = {
    mobyIcon: {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'thumbs-o-up',
      markerColor: 'darkblue'
    },
    challengeIcon: {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'paw',
      markerColor: 'orange'
    },
      stepIcon: {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'life-ring',
      markerColor: 'darkgreen'
    }
  };

  var positionMoby = {
    lat: 45.85,
    lng: 9.38,
    message: '<img class="challengePic" src="./images/yeoman.png" />Beginning of the lonely trip ... ',
    focus: false,
    draggable: false,
    icon: icons.mobyIcon
  };


  var tripList = [
    {
      name: "NewZealand",
      lat: -45.52,
      lng: 170.50,
    },
    {
      name: "London",
      lat: 51.50,
      lng: -0.082,
    },
    {
      name: "Paris",
      lat: 48.83,
      lng: 2.37,
    },
    {
      name: "Roma",
      lat: 41.91,
      lng: 12.48,
    }
  ];

  //Get all challenges position here
  var challengesList = [
    {
      name: "Santiago de Chile",
      lat:-33.4,
      lng:-70.6
    },
    {
      name: "Iles Canaries",
      lat:-27.9,
      lng:-15.5
    },
    {
      name: "Wellington, NZ",
      lat:-41.28,
      lng:174.78
    },
    {
      name: "Québec",
      lat:47,
      lng:-71.4
    }
  ];




  var getChallengeMarkers = function(){
    var markers = new Array();
    angular.forEach(challengesList, function(challenge){
      markers.push({
        lat : challenge.lat,
        lng : challenge.lng,
        message : + challenge.name,
        icon: icons.challengeIcon
      })
    });
    return markers;
  }

  var getTripMarkers = function(){
    var index = 1;
    var markers = new Array();
    angular.forEach(tripList, function(trip){
      markers.push({
        lat : trip.lat,
        lng : trip.lng,
        message : index + '. ' + trip.name,
        icon: icons.stepIcon
      })
      index++;
    });
    return markers;
  }

  $scope.center = {
    lat : positionMoby.lat,
    lng : positionMoby.lng,
    zoom : 5
  };

  $scope.paths = {
    p1:{
      color: '#008000',
      weight: 8,
      latlngs: [
        { lat: 51.50, lng: -0.082 },
        { lat: 48.83, lng: 2.37 },
        { lat: 41.91, lng: 12.48 }
      ],
    }
  }

  $scope.markers = getTripMarkers();
  var challengesMarker = getChallengeMarkers();
  if( challengesMarker instanceof Array){
    console.log("coucou");$
    $scope.markers = $scope.markers.concat(challengesMarker);
  }

  $scope.tiles = tilesDict.thunderforestLandscape;
  $scope.defaults = {
    scrollWheelZoom : false
  }
});
