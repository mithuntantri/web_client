angular.module("zigfo").controller('appController',
              ['$scope','$state', '$rootScope', '$http', '$auth', '$facebook','ProfileService', 'LogOutService', 'MeasurementsService',
              function($scope, $rootScope, $state, $http, $auth, $facebook, ProfileService, LogOutService, MeasurementsService){
  console.log('App Controller');
  $scope.credits = 0
  $scope.ProfileService = ProfileService
  $scope.MeasurementsService = MeasurementsService
  $scope.logOut = ()=>{
    LogOutService.logOut()
  }
}])
