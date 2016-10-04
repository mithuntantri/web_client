angular.module("zigfo").controller('mainController',
              ['$scope','$state', '$rootScope', '$cookies', 'LoginService', 'SignupService',
              function($scope, $rootScope, $state, $cookies, LoginService, SignupService){

      console.log('Main Controller');

      $scope.loggedIn = $rootScope.loggedIn
      $scope.zigfo_wallet = 0
      $scope.loggedIn = false
      $scope.set_expiry = true

      $('.modal.loginmodal').modal({
          closable: false,
          allowMultiple: false,
          duration: 100,
          detachable: false,
          observeChanges: true,
          context: 'none',
          selector: {
              close: '.fa.fa-times'
          }
      });

      $scope.openLoginModal = () =>{
        $('.modal.loginmodal').modal('show')
      }

      $scope.closeLoginModal = () =>{
        $('.modal.loginmodal').modal('hide')
      }

      $scope.login_active = true
      $scope.signup_active = false
      $scope.modalTab = (tab)=>{
        if(tab === 'login'){
          $scope.login_active = true
          $scope.signup_active = false
        }
        else {
          $scope.login_active = false
          $scope.signup_active = true
        }
      }

      $scope.secureLogin = ()=>{
        LoginService.userlogin()
      }

      $scope.secureSignUp = ()=>{
        SignupService.usersignup()
      }

      $scope.fbLogin = ()=>{
        FBLoginService.fblogin()
      }

}])
