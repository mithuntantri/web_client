angular.module("zigfo").controller('mainController',
              ['$scope','$state', '$rootScope', 'LoginService', 'SignupService', 'FBLoginService', 'ModalService',
              function($scope, $state, $rootScope, LoginService, SignupService, FBLoginService, ModalService){

      console.log('Main Controller');

      $scope.loggedIn = $rootScope.loggedIn
      $scope.zigfo_wallet = 0
      $scope.loggedIn = false
      $scope.set_expiry = true
      $scope.has_referral_code = false
      $scope.SignupService = SignupService

      $scope.mobileno = ''
      $scope.referral_code = ''
      $scope.otp = ''
      $scope.new_password = ''
      $scope.retype_password = ''

      $scope.changeReferralId = ()=>{
          $scope.has_referral_code = !$scope.has_referral_code
      }
      $scope.changeOtp = ()=>{
        if($scope.otp.length === 6){
          $scope.verifySignUp()
        }
      }
      $scope.confirmPassword = ()=>{

      }
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
      $('.modal.passwordmodal').modal({
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

      $scope.OpenLoginModal = () =>{
        ModalService.OpenLoginModal()
      }

      $scope.CloseLoginModal = () =>{
        ModalService.CloseLoginModal()
      }

      $scope.OpenPasswordModal = () =>{
        ModalService.OpenPasswordModal()
      }

      $scope.ClosePasswordModal = () =>{
        ModalService.ClosePasswordModal()
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
        SignupService.usersignup($scope.mobileno, $scope.referral_code)
      }

      $scope.verifySignUp = ()=>{
        SignupService.verify_signup($scope.mobileno, $scope.otp)
        let set_password = SignupService.set_password
        let set_profile = SignupService.set_profile
        let verified = SignupService.signup_verified
        console.log(set_password, verified);
        if (verified && set_password){
          $scope.CloseLoginModal()
          $scope.OpenPasswordModal()
        }else if (verified && set_profile){
          $scope.CloseLoginModal()
          $scope.ClosePasswordModal()
          $state.go("main.profile")
        }
      }

      $scope.fbLogin = ()=>{
        FBLoginService.fblogin()
      }

      $scope.createPassword = ()=>{
        SignupService.create_user_password($scope.mobileno, $scope.password)
      }

}])
