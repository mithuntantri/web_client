angular.module("zigfo")
.controller('mainFabricsController', ['$scope','$http','$state', 'FabricsService',
  function ($scope, $http, $state, FabricsService) {
    $scope.FabricsService = FabricsService
    FabricsService.getAllFabrics()

    $scope.getNumber = function(num) {
        return new Array(num);
    }
  }])
