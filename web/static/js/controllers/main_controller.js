angular.module("zigfo").controller('mainController',
              ['$scope','$state', '$rootScope', '$http', '$cookies', '$auth', '$facebook',
              function($scope, $rootScope, $state, $http, $cookies, $auth, $facebook){
                console.log('Main Controller');
      $scope.username = localStorage.username
      $scope.zigfo_wallet = 0

      $scope.login = ()=>{

      }
      $scope.expire = true
      $('.modal.loginmodal').modal({
          closable: false,
          allowMultiple: false,
          duration: 200,
          detachable: false,
          observeChanges: true,
          context: 'none',
          selector: {
              close: '.fa.fa-times'
          }
      });
      $scope.openModal = () =>{
        console.log('Opening Modal');
        $('.modal.loginmodal').modal('show')
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
      $scope.user = {
        "username":"",
        "password":""
      }
      $scope.secureLogin = ()=>{
        $http({
          url: '/api/login',
          method: 'POST',
          data: {
            "username": $scope.user.username,
            "password": $scope.user.password,
            "login_width_otp": false,
            "expiry": false
          }
        }).then((response)=>{
          if(response.data.status === 'success'){
            console.log(response);
            $cookies.put('token',response.data.data.secret)
      		  $cookies.put('loggedIn',"true")
            $cookies.put('name', $scope.user.username)
            $('.modal.loginmodal').modal('hide')
            $state.go("dashboard")
          }
        }, (error)=>{
          console.log(error);
        })
      }
      $scope.loggedIn = false;
      $scope.fblogin = function() {
        $facebook.login().then(function() {
          refresh();
        });
      }
      $scope.fblogout = function () {
        $facebook.logout().then(function() {
          refresh();
        })
      }
      function refresh() {
        $facebook.api("/me").then(
          function(response) {
            console.log('facebook:',response);
            $scope.UserName = response.name;
            $scope.loggedIn = true;
          },
          function(err) {
          });
      }
      refresh();
}])
