angular.module("zigfo").controller('mainSignupController',
              ['$scope','$state', '$rootScope', 'LoginService', 'SignupService',
              'FBLoginService', 'ModalService', 'CategoriesService', 'TabsService',
              function($scope, $state, $rootScope, LoginService, SignupService,
                FBLoginService, ModalService, CategoriesService, TabsService){
                    $scope.email = SignupService.GoogleEmail
                    $scope.password = ''
                    $scope.referral_code = ''
                    $scope.mobileno = ''
                    $scope.mobileno = ''
                    $scope.male = true
                    $scope.female = false
                    if ($scope.male){
                      $scope.gender = 'M'
                    }else{
                      $scope.gender = 'F'
                    }
                    $scope.otp = ''
                    $scope.setGender = ()=>{
                      if ($scope.male){
                        $scope.gender = 'M'
                      }else{
                        $scope.gender = 'F'
                      }
                    }
                    $scope.secureSignup = ()=>{
                      let has_referral_code = false
                      if ($scope.referral_code !== ""){
                        has_referral_code = true
                      }
                      SignupService.usersignup($scope.email, $scope.password, $scope.mobileno, $scope.referral_code, has_referral_code, $scope.gender)
                    }
                    $scope.verifyOtp = ()=>{
                      SignupService.verify_signup($scope.mobileno.toString(), $scope.otp.toString())
                    }
                }])
