angular.module("zigfo").controller('appController',
              ['$scope','$state', '$rootScope', '$http', '$auth', '$facebook','ProfileService', 'LogOutService',
              function($scope, $rootScope, $state, $http, $auth, $facebook, ProfileService, LogOutService){
  console.log('App Controller');
  $scope.credits = 0
  $scope.ProfileService = ProfileService
  $scope.logOut = ()=>{
    LogOutService.logOut()
  }
}])
