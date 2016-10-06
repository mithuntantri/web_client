angular.module("zigfo").controller('appController',
              ['$scope','$state', '$rootScope', '$http', '$auth', '$facebook','ProfileService',
              function($scope, $rootScope, $state, $http, $auth, $facebook, ProfileService){
  console.log('App Controller');
  $scope.credits = 0
  $scope.ProfileService = ProfileService
}])
