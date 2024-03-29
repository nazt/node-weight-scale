// Generated by CoffeeScript 1.6.3
(function() {
  'use strict';
  var MainCtrl;

  MainCtrl = (function() {
    function MainCtrl() {
      Application.Controllers.controller("MainCtrl", [
        "$scope", "$socket", function($scope, $socket) {

          $socket.on('connectedUsers', function(data) {
            $scope.connectedUsers = data;
          })

          $socket.on('height', function (data) {
            $scope['height'] = data['height']
            $scope['bmi'] = parseInt($scope['weight']) / Math.pow(parseInt($scope['height']) / 100, 2);
          })

          $socket.on('weight', function (data) {
            $scope['weight'] = data['weight']
            console.log($scope['weight']);
            $scope['bmi'] = parseInt($scope['weight']) / Math.pow(parseInt($scope['height']) / 100, 2);
          })

          socket.get('/bmi/read')
          socket.get('/bmi/weight')
          
          $scope.foo = "booyah";
        }
      ]);
    }

    return MainCtrl;

  })();

  window.MainCtrl = new MainCtrl();

}).call(this);
