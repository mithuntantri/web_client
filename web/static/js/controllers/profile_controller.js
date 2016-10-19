angular.module("zigfo")
.controller('profileController',
  ['$scope','$state','$http', 'TabsService',
    function ($scope, $state, $http, TabsService) {
      $scope.TabsService = TabsService

}])
