// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp = angular.module('starter', ['ionic', 'ngCordova']);

ionicApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

ionicApp.controller('ExampleController', function($scope, $cordovaCamera, $window){
  $scope.images = [];

  $scope.loadImages = function(){
    for(var i = 0; i < 4; i++){
      $scope.images.push({id: i, src: 'http://placehold.it/50x50'})
    }
  }

  $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 400,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            // $scope.ocrString = $window.OCRAD(imageData);
            $window.OCRAD(imageData).then(function(string){
              $scope.ocrString = string;
            });
        }, function(err) {
            // An error occured. Show a message to the user
            alert('An error occurred while capturing image.');
        });
    }
});
