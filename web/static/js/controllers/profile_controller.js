angular.module("zigfo")
.controller('profileController',
  ['$scope','$state','$http', 'TabsService', 'MeasurementsService', 'ModalService',
    function ($scope, $state, $http, TabsService, MeasurementsService ,ModalService) {
      $scope.TabsService = TabsService
      $scope.MeasurementsService = MeasurementsService
      $scope.ModalService = ModalService
}])
