'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CreatetripCtrl
 * @description
 * # CreatetripCtrl
 * Controller of the clientApp
 */

app.controller('CreatetripCtrl', function ($scope, Trip, Auth, guid, $http, $location) {
    $scope.formTrip = new Trip({id: guid()});
    $scope.files = []
    $scope.saveTrip = function(){
        $scope.formTrip.save($scope.files);
    };
    
    Auth.checkIsAdmin()

    //adding some code
    //============== DRAG & DROP =============
    // source for drag&drop: http://www.webappers.com/2011/09/28/drag-drop-file-upload-with-html5-javascript/
    var dropbox = document.getElementById("dropbox")
    $scope.dropText = 'Drop files here...'
    

    // init event handlers
    function dragEnterLeave(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        $scope.$apply(function(){
            $scope.dropText = 'Drop files here...'
            $scope.dropClass = ''
        })
    }
    dropbox.addEventListener("dragenter", dragEnterLeave, false)
    dropbox.addEventListener("dragleave", dragEnterLeave, false)
    dropbox.addEventListener("dragover", function(evt) {
        evt.stopPropagation()
        evt.preventDefault()
        var clazz = 'not-available'
        var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0
        $scope.$apply(function(){
            $scope.dropText = ok ? 'Drop files here...' : 'Only files are allowed!'
            $scope.dropClass = ok ? 'over' : 'not-available'
        })
    }, false)
    dropbox.addEventListener("drop", function(evt) {
        console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
        evt.stopPropagation()
        evt.preventDefault()
        $scope.$apply(function(){
            $scope.dropText = 'Drop files here...'
            $scope.dropClass = ''
        })
        var files = evt.dataTransfer.files
        if (files.length > 0) {
            $scope.$apply(function(){
                $scope.formTrip.files = []
                for (var i = 0; i < files.length; i++) {
                    $scope.formTrip.files.push(files[i])
                }
            })
        }
    }, false)
    //============== DRAG & DROP =============

    $scope.setFiles = function(element) {
    $scope.$apply(function($scope) {
      console.log('files:', element.files);
      // Turn the FileList object into an Array
        for (var i = 0; i < element.files.length; i++) {
          $scope.files.push(element.files[i])
        }
      });
    };
    
    $scope.queryNominatim = function(which){
      var query = encodeURIComponent($scope.formTrip[which]);
      $http.get("http://nominatim.openstreetmap.org/search/"+query+"?format=json")
      .success(function(data){
        $scope.formTrip[which + 'Lat'] = parseFloat(data[0].lat);
        $scope.formTrip[which + 'Lng'] = parseFloat(data[0].lon);
      });
    }

  });
