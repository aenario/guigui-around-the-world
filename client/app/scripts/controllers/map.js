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
  $scope.defaults = {
    tileLayer: 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
    maxZoom : 14
  }
  /** Set icons for the map
   * From Font Awesome
   * See https://github.com/lvoogdt/Leaflet.awesome-markers
   */
  var icons = {
    mobyIcon: {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'smile-o',
      markerColor: 'orange'
    },
    challengeIcon: {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'picture-o',
      markerColor: 'orange'
    },
      stepIcon: {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'car',
      markerColor: 'darkgreen'
    }
  };

  var positionMoby = {
    lat: 45.85,
    lng: 9.38,
    message: '<img class="challengePic" src="./images/yeoman.png" />Beginning of the lonely trip ... ',
    icon: icons.mobyIcon
  };


  $scope.tripList = Trip.list();

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
        layer: "challenge",
        lat : challenge.lat,
        lng : challenge.lng,
        message : + challenge.name,
        icon: icons.challengeIcon
      })
    });
    return markers;
  }

  var getTripMarkers = function(){
    console.log("coucou getTripMarkers ", $scope.tripList)
    var index = 1;
    var path = [{lat : positionMoby.lat, lng: positionMoby.lng}];
    var markers = [positionMoby];
    angular.forEach($scope.tripList, function(trip){
      console.log("A trip ...")
      path.push({
        lat : parseFloat(trip.pointStartLat),
        lng : parseFloat(trip.pointStartLng)
      });

      markers.push({
        layer : 'trip',
        lat : parseFloat(trip.pointStartLat),
        lng : parseFloat(trip.pointStartLng),
        message : index + '. ' + trip.Name,
        icon: icons.stepIcon
      })
      $scope.paths.p1 = {
        color: '#008000',
        layer: "trip",
        weight: 8,
        latlngs: path
      }

      index++;
    });
    console.log (path);
    return markers;

  }

  $scope.paths = {}

  $scope.center = {
    lat : positionMoby.lat,
    lng : positionMoby.lng,
    zoom : 5
  };

  var challengesMarker = getChallengeMarkers();
  $scope.$watch('tripList.length', function(newvalue, oldvalue){
    console.log("WATCHER HERE", newvalue, $scope.tripList);
    if (newvalue === 0) return null
    $scope.markers = getTripMarkers()
    if( challengesMarker instanceof Array){
      $scope.markers = $scope.markers.concat(challengesMarker);
    }
  });

  $scope.layers = {
    "baselayers": {
      "OpenStreetMap": {
        "name": "OpenStreetMap",
        "url": 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
        "type": "xyz"
      }
    },
    "overlays": {
      "challenge": {
        "name": "challenge",
        "type": "group",
        "visible": true
        },
      "trip": {
        "name": "trip",
        "type": "group",
        "visible": true
        }
      }
    };

/*  $scope.toggleLayer = function(type){
    $scope.layers.overlays[type].visible = !$scope.layers.overlays[type].visible ;
  }*/

});
